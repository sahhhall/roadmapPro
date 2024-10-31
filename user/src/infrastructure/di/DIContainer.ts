import { IGetUserDetailsUseCase } from "../../application/interfaces/IGetUserDetailsUseCase";
import { IMentorApprovalUseCase } from "../../application/interfaces/IMentorApprovalUseCase";
import {  GetUserDetailsUseCase } from "../../application/usecases/GetUserDetailsUseCase";
import { MentorApprovalUseCase } from "../../application/usecases/MentorApprovalUseCase";
import { IMentorRepository } from "../../domain/interfaces/IMentorRepositary";
import { IUserRepository } from "../../domain/interfaces/IUserRepositary";
import { MentorRepositary } from "../repositories/MentorRepositary";
import { UserRepository } from "../repositories/UserRepositary";



export class DIContainer {
    private static instance: DIContainer;
    private _mentorRepositary: IMentorRepository;
    private _userProfileRepositary: IUserRepository;
    private constructor() {
        this._mentorRepositary = new MentorRepositary();
        this._userProfileRepositary = new UserRepository();
    }

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer()
        }
        return DIContainer.instance;
    };

    //for kafka
    public mentorApprovalUseCase(): IMentorApprovalUseCase {
        return new MentorApprovalUseCase(this._mentorRepositary, this._userProfileRepositary);
    }

    //

    public getUserDetailsUseCase(): IGetUserDetailsUseCase {
        return new GetUserDetailsUseCase(this._userProfileRepositary);
    }
}