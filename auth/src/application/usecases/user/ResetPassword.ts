import { User } from "../../../domain/entities/User";
import { IRedisRepository } from "../../../domain/interfaces/ICacheUserRepo";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { generatePasswordResetToken } from "../../services/GeneratePasswordToken";



export class ResetPasswordToken {
    constructor(private redisRepository: IRedisRepository,
        private userRepository: IUserRepository,
    ) { }

    async execute({ email }: { email: string }) {        
        const token = await generatePasswordResetToken.generate();
        const user = await this.userRepository.findByEmail(email) as User;
        if (user?.isBlocked) {
            return {
                blocked:true,
                token
            }
        }
        if (!user) {
            return {
                success: false,
                token
            }
        } 
        await this.redisRepository.storeToken(token,user.email );
        return {
            success: true,
            token,
            user
        }
    }
}