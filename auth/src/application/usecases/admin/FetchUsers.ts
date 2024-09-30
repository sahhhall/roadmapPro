import { User } from "../../../domain/entities/User";
import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { Password } from "../../services/PasswordHash";




export class FetchUsers {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(): Promise<any | null> {
        try {
            const users = await this.userRepository.fetchUsers();
            return { users }
        } catch (error) {
            console.log(error)
        }

    }
}