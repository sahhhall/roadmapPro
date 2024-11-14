import { IGetMentorDetailsByIdUseCase } from "../../application/interfaces/mentor/IGetMentorDetailsByIdUseCase";
import { IGetMentorsBySkillUseCase } from "../../application/interfaces/mentor/IGetMentorsBySkillUseCase";
import { IUpdateAdditionalInfoUseCase } from "../../application/interfaces/mentor/IUpdateAdditionalinolUseCase";
import { IGetUserDetailsUseCase } from "../../application/interfaces/user/IGetUserDetailsUseCase";
import { IMentorApprovalUseCase } from "../../application/interfaces/user/IMentorApprovalUseCase";
import { GetMentorDetailsByIdUseCase } from "../../application/usecases/mentor/GetMentorDetailsByIdUseCase";
import { GetMentorsBySkillUseCase } from "../../application/usecases/mentor/GetMentorsBySkillUseCase";
import { UpdateAdditionalInfoUseCase } from "../../application/usecases/mentor/UpdateAdditionalinolUseCase";
import { GetUserDetailsUseCase } from "../../application/usecases/user/GetUserDetailsUseCase";
import { MentorApprovalUseCase } from "../../application/usecases/user/MentorApprovalUseCase";
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
        return new GetUserDetailsUseCase(this._userProfileRepositary, this._mentorRepositary);
    };


    //mentors

    public getMentorsBySkillUseCase(): IGetMentorsBySkillUseCase {
        return new GetMentorsBySkillUseCase(this._mentorRepositary);
    }

    public getMentorByIdUseCase(): IGetMentorDetailsByIdUseCase {
        return new GetMentorDetailsByIdUseCase(this._mentorRepositary)
    }

    public updateMentorDetails(): IUpdateAdditionalInfoUseCase {
        return new UpdateAdditionalInfoUseCase(this._mentorRepositary)
    }
}