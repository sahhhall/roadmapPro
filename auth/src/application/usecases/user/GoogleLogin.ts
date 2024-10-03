import { User } from "../../../domain/entities/User";
import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";


export class GoogleLogin {
    constructor(
        private userRepository: IUserRepository,
        private jwtservice: ITokenService
    ) { };


    async execute({
        name,
        email,
        avatar = "https://res.cloudinary.com/dgvcq2pqp/image/upload/v1721892963/r9jiss1giwn3p14ck81h.jpg",
        password = '123456'
    }: Pick<User, 'name' | 'email' | 'avatar' | 'password'>) {
        const user = new User(
            name,
            email,
            avatar,
            password,
        );
        user.isGoogle = true;
        const dbsave = this.userRepository.create(user);
        const accessToken = this.jwtservice.generateAccessToken(dbsave)
        const refreshToken = this.jwtservice.generateRefreshToken(dbsave);
        return {
            user: {
                id: user.id as string,
                email: user.email,
            },
            accessToken,
            refreshToken
        }
    }
}