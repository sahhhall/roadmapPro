import { Request, Response } from "express";
import { validate } from "class-validator";
import { VerifyOtpDto } from "../../dto/VerifyOtpDto";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { UserCreatedPublisher } from "../../../infrastructure/kafka/producers/user-created-publisher";
import kafkaWrapper from "../../../infrastructure/kafka/kafka-wrapper";
import { Producer } from "kafkajs";
import { registerUser } from "../../../infrastructure/rpc/grpc/client";


export class OtpVerifyController {
    private verifyUser = DIContainer.verifyUserUserCase()
    async verify(req: Request, res: Response): Promise<Response> {
        const dto = Object.assign(new VerifyOtpDto(), req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            const response = await this.verifyUser.execute(dto);

            if (response.success) {
                console.log(response.user)
                await new UserCreatedPublisher(kafkaWrapper.producer as Producer).produce({
                    id: response.user!.id as string,
                    name: response.user!.name as string,
                    email: response.user!.email as string,
                    role: response.user!.role as string,
                    avatar: response.user!.avatar as string,
                    isAdmin: response.user!.isAdmin as boolean,
                    isGoogle: response.user!.isAdmin as boolean,
                })
                const grpcResponse = await registerUser({
                    userId: response.user!.id,
                    name: response.user!.name,
                    email: response.user!.email,
                    avatar: response.user!.avatar,
                    isGoogle: response.user!.isGoogle,
                });
                console.log(grpcResponse,"grpcresponse from normal")
                res.cookie(`user_accessToken`, response.accessToken, {
                    httpOnly: true, 
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "none",
                });
                res.cookie(`user_refreshToken`, response.refreshToken, {
                    httpOnly: true, 
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "none",
                });
                return res.status(200).json({ userVerified: response.user });
            } else {
                return res.status(400).json({ message: response.message });
            }
        } catch (error) {
            console.error("Error in OTP verification controller:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}