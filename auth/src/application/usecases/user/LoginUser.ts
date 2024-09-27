import { User } from "../../../domain/entities/User";
import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { Password } from "../../../infrastructure/services/password";


export interface LoginResponse {
    user: {
        id: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}

export class LoginUser {
    constructor(
        private userRepository: IUserRepository,
        private jwtservice: ITokenService
    ) { }

    async execute({
        email,
        password
    }: Pick<User, "email" | "password">): Promise<LoginResponse | null> {
        const user = await this.userRepository.findByEmail(email);

        if (user && await Password.compare(password, user.password)) {
            const accessToken = this.jwtservice.generateAccessToken(user)
            const refreshToken = this.jwtservice.generateRefreshToken(user);
            return {
                user: {
                    id: user.id as any,
                    email: user.email,
                },
                accessToken,
                refreshToken
            }
        }
        return null;
    }
}