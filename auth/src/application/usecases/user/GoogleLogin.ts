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
        avatar,
    }: Pick<User, 'name' | 'email' | 'avatar'>) {
        // const user = new User(
        //     name,
        //     email,
        //     password,
        //     avatar as string,
        // );
        let user = await this.userRepository.findByEmail(email);

        if (user) {
            user.name = name;
            user.avatar = avatar;
            user.isGoogle = true;
            await this.userRepository.update(user);
        } else {
            user = new User(
                name,
                email,
                'google',
                avatar as string,
            );
            user.isGoogle = true;
            await this.userRepository.create(user);
        }
        const dbsave = this.userRepository.create(user);
        const accessToken = this.jwtservice.generateAccessToken(dbsave)
        const refreshToken = this.jwtservice.generateRefreshToken(dbsave);
        return {
            user,
            accessToken,
            refreshToken
        }
    }
}