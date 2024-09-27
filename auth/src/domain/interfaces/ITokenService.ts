
export interface ITokenService {
    generateAccessToken(payload: object): string;
    generateRefreshToken(payload: object): string;
    // verifyToken(token: string): any;
    // verifyRefreshToken(token: string): any;
}