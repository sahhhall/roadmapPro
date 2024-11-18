import JWT from 'jsonwebtoken'
import { User } from "../../domain/entities/User";
import { ITokenService } from "../../domain/interfaces/ITokenService";

export class JwtService implements ITokenService {
    private readonly accessTokenSecret: string;
    private readonly refreshTokenSecret: string;

    constructor() {
        this.accessTokenSecret = process.env.JWT_ACCESS_SECRET as string;
        this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET as string;
    }

    generateAccessToken(user: Pick<User, "id" | "email" | "role">): string {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const options = {
            expiresIn: '1m'
        }
        return JWT.sign(payload, this.accessTokenSecret, options)
    }

    generateRefreshToken(user: Pick<User, "id" | "email" | "role">): string {
        return JWT.sign({ id: user.id, email: user.email, role: user.role }, this.refreshTokenSecret, { expiresIn: '7d' });
    }
    // verifyToken(token: string): any {
    //     return JWT.verify(token, this.accessTokenSecret)
    // }
    verifyRefreshToken(token: string): any {
        return JWT.verify(token, this.refreshTokenSecret);
    }
}