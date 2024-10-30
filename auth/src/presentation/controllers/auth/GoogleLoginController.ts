import { Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { UserCreatedPublisher } from "../../../infrastructure/kafka/producers/user-created-publisher";
import { Producer } from "kafkajs";
import kafkaWrapper from "../../../infrastructure/kafka/kafka-wrapper";
import { registerUser } from "../../../infrastructure/rpc/grpc/client";




export class GoogleLoginController {
    private loginGoogle = DIContainer.getGoogleLoginUseCase();
    async login(req: Request, res: Response) {
        try {
            const { email, name, avatar } = req.body;
            const user = await this.loginGoogle.execute({
                email,
                name,
                avatar,
            });
            console.log('user',user)
            await new UserCreatedPublisher(kafkaWrapper.producer as Producer).produce({
                id: user.user!.id as string,
                name: user.user!.name as string,
                email: user.user!.email as string,
                role: user.user!.role as string,
                avatar: user.user!.avatar as string,
                isAdmin: user.user!.isAdmin as boolean,
                isGoogle: user.user!.isAdmin as boolean,
            })
            const grpcResponse = await registerUser({
                userId: user.user!.id,
                name: user.user!.name,
                email: user.user!.email,
                avatar: user.user!.avatar,
                isGoogle: user.user!.isGoogle,
            });
            console.log(grpcResponse,"grpcresponse from google")
            res.cookie(`user_accessToken`, user.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
            });
            res.cookie(`user_refreshToken`, user.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
            });
            res.json({
                user: user?.user,
            })
        } catch (err) {
            console.log(err)
        }
    }
}