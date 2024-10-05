import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { IRedisRepository } from "../../../domain/interfaces/ICacheUserRepo";
import { User } from "../../../domain/entities/User";
import { Password } from "../../services/PasswordHash";



export class VerifyPasswordReset {
    constructor(private redisRepository: IRedisRepository,
        private userRepository: IUserRepository,
    ) { };

    async execute({ email, token, newPassword }: { email: string, token: string, newPassword: string }) {
        try {
            const storedToken = await this.redisRepository.verifyToken(email);
            console.log(storedToken,"stored")
            if (!storedToken) {
                return {
                    success: false,
                    message: "No token found or token expired."
                };
            }

            if (storedToken as any !== token) {
                return {
                    success: false,
                    message: "Invalid  token."
                };
            }
            let hashedPassword = await Password.toHash(newPassword) as string;
            await this.userRepository.partialUpdate(email, hashedPassword);
            await this.redisRepository.deleteToken(email)
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false
            }
        }
    }
}