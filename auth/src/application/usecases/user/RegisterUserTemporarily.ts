import { User } from "../../../domain/entities/User";
import { IRedisRepository } from "../../../domain/interfaces/IRedisRepository";
import { IOtpService } from "../../interfaces/IOtpService";


export class RegisterUserTemporarily {
    constructor(private redisRepository: IRedisRepository,
        private otpService: IOtpService
    ) { };

    async execute(user: Pick<User, 'avatar' | 'email' | 'name' | 'password'>): Promise<string | void> {
        try {
            await this.redisRepository.saveUnverifiedUser(user.email, user);
            const otp =await this.otpService.generateOtp();
            await this.redisRepository.storeOtp(user.email, otp);
            return otp;
        } catch (error) {
            console.error("Error while registering user temporarily:", error);
        }
    }
}