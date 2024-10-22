import { ICreateQuestionUseCase } from "../../application/interfaces/admin/ICreateQuestionUseCase";
import { ICreateStackUseCase } from "../../application/interfaces/admin/ICreateStackUseCase";
import { IDeleteStackUseCase } from "../../application/interfaces/admin/IDeleteStackUseCase";
import { IGetAllStackUseCase } from "../../application/interfaces/admin/IGetAllStacksUseCase";
import { CreateQuestionUseCase } from "../../application/usecases/admin/CreateQuestionUseCase";
import { CreateStackUseCase } from "../../application/usecases/admin/CreateStackUseCase";
import { DeleteStackUseCase } from "../../application/usecases/admin/DeleteStackUseCase";
import { GetAllStackUseCase } from "../../application/usecases/admin/GetAllStacksUseCase";
import { IQuestionRepo } from "../../domain/interfaces/IQuestionRepo";
import { IStackRepo } from "../../domain/interfaces/IStackRepo";
import { ITestRepo } from "../../domain/interfaces/ITestRepo";
import { QuestionRepository } from "../repositories/QuestionRepositary";
import { StackRepository } from "../repositories/StackRepositary";
import { TestRepository } from "../repositories/TestRepositary";





export class DIContainer {
    private static instance: DIContainer;
    private _stackRepositary: IStackRepo;
    private _questionRepositary: IQuestionRepo;
    private _testRepositary: ITestRepo;
    private constructor() {
        this._stackRepositary = new StackRepository
        this._questionRepositary = new QuestionRepository
        this._testRepositary = new TestRepository
    }

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer()
        }
        return DIContainer.instance;
    };

    public getCreateUseCase(): ICreateStackUseCase {
        return new CreateStackUseCase(this._stackRepositary);
    }

    public getAllStacksUseCase(): IGetAllStackUseCase {
        return new GetAllStackUseCase(this._stackRepositary);
    }

    public deleteStackUseCase(): IDeleteStackUseCase {
        return new DeleteStackUseCase(this._stackRepositary)
    }


    ///questions

    public createQuestionUseCase(): ICreateQuestionUseCase {
        return new CreateQuestionUseCase(this._questionRepositary)
    }
}