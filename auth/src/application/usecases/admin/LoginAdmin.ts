import { User } from "../../../domain/entities/User";
import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { Password } from "../../services/PasswordHash";


export interface LoginResponse {
    user: {
        id: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}

export class LoginAdmin {
    constructor(
        private userRepository: IUserRepository,
        private jwtservice: ITokenService
    ) { }

    async execute({
        email,
        password
    }: Pick<User, "email" | "password">): Promise<LoginResponse | null> {
        const admin = await this.userRepository.findByEmail(email);

        if (admin && await Password.compare(password, admin.password) && admin.isAdmin) {
            const accessToken = this.jwtservice.generateAccessToken(admin)
            const refreshToken = this.jwtservice.generateRefreshToken(admin);
            return {
                user: {
                    id: admin.id as any,
                    email: admin.email,
                },
                accessToken,
                refreshToken
            }
        }
        return null;
    }
}