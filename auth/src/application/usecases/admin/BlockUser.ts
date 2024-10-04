import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";


export class BlockUser {
    constructor(
        private userRepository: IUserRepository,
    ) { };

    async excute({
        email
    }: { email: string }) {
        const user = await this.userRepository.findByEmail(email) as User;
        user.isBlocked = !user?.isBlocked;
        await this.userRepository.update(user);
        return user
    }
}