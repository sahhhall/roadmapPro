import { IUserRepository } from "../../../domain/interfaces/IUserRepository";




export class FetchUsers {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(page: number, pageSize: number): Promise<any | null> {
        try {
            const users = await this.userRepository.fetchUsers(page,pageSize);
            return { users }
        } catch (error) {
            console.log(error)
        }

    }
}