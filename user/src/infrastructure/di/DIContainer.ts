import { IMentorApprovalUseCase } from "../../application/interfaces/IMentorApprovalUseCase";
import { MentorApprovalUseCase } from "../../application/usecases/MentorApprovalUseCase";
import { IMentorRepository } from "../../domain/interfaces/IMentorRepositary";
import { MentorRepositary } from "../repositories/MentorRepositary";



export class DIContainer {
    private static instance: DIContainer;
    private _mentorRepositary: IMentorRepository;
    private constructor() {
        this._mentorRepositary = new MentorRepositary();

    }

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer()
        }
        return DIContainer.instance;
    };

    //for kafka
    public mentorApprovalUseCase(): IMentorApprovalUseCase {
        return new MentorApprovalUseCase(this._mentorRepositary);
    }
}