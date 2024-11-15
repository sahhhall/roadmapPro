import { NotFoundError } from "@sahhhallroadmappro/common";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/IUserRepositary";
import { IUpdateUserDataUseCase } from "../../interfaces/user/IUpdateUserDataUseCase";

export class UpdateUserDataUseCase implements IUpdateUserDataUseCase {
    constructor(private userRepositary: IUserRepository) { }

    async execute(userId: string, data: { name?: string, avatar?: string }): Promise<User | null> {
        console.log(userId)
        // const existingUser = await this.userRepositary.getUserDetails(userId);
        // if (existingUser) {
        //     throw new NotFoundError();
        // }

        const updated = await this.userRepositary.updateUserProfileData(userId, data);
        return updated
    }
}