import { User } from "../../../domain/entities/User";
import { IRedisRepository } from "../../../domain/interfaces/IRedisRepository";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
interface OtpVerificationParams {
    otp: string;
    email: string;
}

export class OtpVerification {
    constructor(private redisRepository: IRedisRepository,
        private userRepository: IUserRepository
    ) { }

    async execute({ otp, email }: OtpVerificationParams): Promise<User | null> {
        try {
            const storedOtp = await this.redisRepository.getOtp(email);
            if (otp === storedOtp) {
                const unverifiedUser = await this.redisRepository.getUnverifiedUser(email);
                if (!unverifiedUser) {
                    throw new Error("No unverified user found.");
                    //here not found comes
                }
                // Create a new User instance
                const user = new User(
                    unverifiedUser.name,
                    unverifiedUser.email,
                    unverifiedUser.password,
                    unverifiedUser.avatar ||  "https://res.cloudinary.com/dgvcq2pqp/image/upload/v1721892963/r9jiss1giwn3p14ck81h.jpg"
                );
                await this.userRepository.create(user);
                await this.redisRepository.removeUnverifiedUser(email);
                return user
            }
            return null;
        } catch (error) {
            console.error("Error verifying OTP:", error);
            throw new Error("OTP verification failed");
        }
    }
}