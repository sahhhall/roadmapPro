import { BlockError } from "@sahhhallroadmappro/common";
import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";




export class RefreshToken {
    constructor(
        private jwtService: ITokenService, private userRepositary: IUserRepository) { }

    async execute(token: any) {
        console.log("token from user user case", token);
        const decoded = this.jwtService.verifyRefreshToken(token);

        console.log(decoded, "decoded")

        const user = await this.userRepositary.findById(decoded.id);
        if(user?.isBlocked) {
            throw new BlockError();
        }
        const accessToken = this.jwtService.generateAccessToken(decoded)
        const refreshToken = this.jwtService.generateRefreshToken(decoded);
        return {
            accessToken,
            refreshToken
        }
    }
}