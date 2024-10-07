import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";




export class RefreshToken {
    constructor(
        private jwtService: ITokenService) { }

    async execute( token : any ) {
        console.log("token from user user case",token);
        const decoded = this.jwtService.verifyRefreshToken(token);

        console.log(decoded, "decoded")
        const accessToken = this.jwtService.generateAccessToken(decoded)
        const refreshToken = this.jwtService.generateRefreshToken(decoded);
        return {
            accessToken,
            refreshToken
        }
    }
}