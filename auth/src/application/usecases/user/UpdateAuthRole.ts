import { NotFoundError } from "@sahhhallroadmappro/common";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { IUpdateAuthRole } from "../../interfaces/IUpdateAuthRole";
export class UpdateAuthRole implements IUpdateAuthRole {
    constructor(private userRepository: IUserRepository) { };

    async execute(userId: string): Promise<User | null> {
        // this for suppose in fuearute i have to add new feature like degrade mentor so i can reuse 
        //ththis with find
        let user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError()
        }
        let role = user.role === 'mentor' ? 'user' : 'mentor'

        //updating the auth repo
        let updateUserData = await this.userRepository.genericUpdate(userId, { role: role });
        return updateUserData
    }
}