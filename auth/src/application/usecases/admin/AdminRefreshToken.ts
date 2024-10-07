import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class AdminRefreshToken {
    constructor(private jwtService: ITokenService) {}

    async execute(token: string) {
        try {
            const decoded = this.jwtService.verifyRefreshToken(token);
            const accessToken = this.jwtService.generateAccessToken(decoded);
            const refreshToken = this.jwtService.generateRefreshToken(decoded);

            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            console.error("Err admin refresh token execution", error);
        }
    }
}
