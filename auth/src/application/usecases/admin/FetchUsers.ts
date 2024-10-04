import { IUserRepository } from "../../../domain/interfaces/IUserRepository";




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