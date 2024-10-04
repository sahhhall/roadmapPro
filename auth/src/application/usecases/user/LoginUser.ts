import { User } from "../../../domain/entities/User";
import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { Password } from "../../services/PasswordHash";
import { BlockError } from '@sahhhallroadmappro/common'

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
    }: Pick<User, "email" | "password">): Promise<User | any> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || user.isGoogle) {
            return {
                notfound: true
            }
        }
        if (user?.isBlocked) {
            throw new BlockError();
        }
        if (user && await Password.compare(password, user.password)) {
            const accessToken = this.jwtservice.generateAccessToken(user)
            const refreshToken = this.jwtservice.generateRefreshToken(user);
            return {
                user,
                accessToken,
                refreshToken
            }
        }
        return null;
    }
}