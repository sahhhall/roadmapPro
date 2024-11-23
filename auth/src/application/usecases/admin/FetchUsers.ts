import { IUserRepository } from "../../../domain/interfaces/IUserRepository";




export class FetchUsers {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(page: number, pageSize: number): Promise<any | null> {
        try {
            const { users, total } = await this.userRepository.fetchUsers(page, pageSize) as any;
            return {
                users,
                total
            };
        } catch (error) {
            console.log(error)
        }

    }
}