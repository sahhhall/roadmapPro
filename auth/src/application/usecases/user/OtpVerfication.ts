import { User } from "../../../domain/entities/User";
import { IRedisRepository } from "../../../domain/interfaces/ICacheUserRepo";
import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

interface OtpVerificationParams {
    otp: string;
    email: string;
}

interface OtpVerificationResponse {
    success: boolean;
    user?: User | null;
    message?: string;
    refreshToken?: string;
    accessToken?: string
}

export class OtpVerification {
    constructor(
        private redisRepository: IRedisRepository,
        private userRepository: IUserRepository,
        private jwtservice: ITokenService
    ) { }

    async execute({ otp, email }: OtpVerificationParams): Promise<OtpVerificationResponse> {
        try {
            const storedOtp = await this.redisRepository.getOtp(email);
            if (!storedOtp) {
                return { success: false, message: "OTP not found or has expired." };
            }

            if (otp !== storedOtp) {
                return { success: false, message: "Invalid OTP provided." };
            }

            const unverifiedUser = await this.redisRepository.getUnverifiedUser(email);
            if (!unverifiedUser) {
                return { success: false, message: "No unverified user found." };
            }

            const user = new User(
                unverifiedUser.name,
                unverifiedUser.email,
                unverifiedUser.password,
                unverifiedUser.avatar || "https://res.cloudinary.com/dgvcq2pqp/image/upload/v1721892963/r9jiss1giwn3p14ck81h.jpg"
            );

            await this.userRepository.create(user);
            await this.redisRepository.removeUnverifiedUser(email);
            const accessToken = this.jwtservice.generateAccessToken(user)
            const refreshToken = this.jwtservice.generateRefreshToken(user);
            return { success: true, user, accessToken, refreshToken };
        } catch (error) {
            console.error("Error verifying OTP:", error);
            return { success: false, message: "Internal server error." };
        }
    }
}