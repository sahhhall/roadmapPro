import { User } from "../../../domain/entities/User";
import { IRedisRepository } from "../../../domain/interfaces/IRedisRepository";
import { IOtpService } from "../../interfaces/IOtpService";


export class ResendOTP {
    constructor(private redisRepository: IRedisRepository,
        private otpService: IOtpService
    ) { };

    async execute(user: Pick<User,  'email' >): Promise<string | void> {
        try {
            const isUnverified = await this.redisRepository.getUnverifiedUser(user.email);
            if(!isUnverified) {
                //common error here
                throw new Error("Email not found ");
            }
            const otp = await this.otpService.generateOtp();
            await this.redisRepository.storeOtp(user.email, otp);
            return otp;
        } catch (error) {
            console.error("Error while generaing otp:", error);
        }
    }
}