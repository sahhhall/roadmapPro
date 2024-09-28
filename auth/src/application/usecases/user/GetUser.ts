import { IUserRepository } from "../../../domain/interfaces/IUserRepository"; 




export class GetUser {
    constructor (private userRepositary: IUserRepository) {};

    async execute ({email}: {email: string}): Promise<any>{
         return await this.userRepositary.findByEmail(email);
    }
}