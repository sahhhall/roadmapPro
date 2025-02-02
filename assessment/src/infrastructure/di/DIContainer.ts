import { ICreateQuestionUseCase } from "../../application/interfaces/admin/ICreateQuestionUseCase";
import { ICreateStackUseCase } from "../../application/interfaces/admin/ICreateStackUseCase";
import { IDeleteQuestionUseCase } from "../../application/interfaces/admin/IDeleteQuestionUseCase";
import { IDeleteStackUseCase } from "../../application/interfaces/admin/IDeleteStackUseCase";
import { IGetAllQuestionByStack } from "../../application/interfaces/admin/IGetAllQuestionByStack";
import { IGetAllStackUseCase } from "../../application/interfaces/admin/IGetAllStacksUseCase";
import { ICreateTestUseCase } from "../../application/interfaces/user/ITestCreateUseCase";
import { CreateQuestionUseCase } from "../../application/usecases/admin/CreateQuestionUseCase";
import { CreateStackUseCase } from "../../application/usecases/admin/CreateStackUseCase";
import { CreateTestUseCase } from "../../application/usecases/user/CreateTestUseCase";
import { DeleteQuestionUseCase } from "../../application/usecases/admin/DeleteQuestionUseCase";
import { DeleteStackUseCase } from "../../application/usecases/admin/DeleteStackUseCase";
import { GetAllQuestions } from "../../application/usecases/admin/GetAllQuestionByStack";
import { GetAllStackUseCase } from "../../application/usecases/admin/GetAllStacksUseCase";
import { IQuestionRepo } from "../../domain/interfaces/IQuestionRepo";
import { IStackRepo } from "../../domain/interfaces/IStackRepo";
import { ITestRepo } from "../../domain/interfaces/ITestRepo";
import { QuestionRepository } from "../repositories/QuestionRepositary";
import { StackRepository } from "../repositories/StackRepositary";
import { TestRepository } from "../repositories/TestRepositary";
import { IEvaluateTestUseCase } from "../../application/interfaces/user/IEvaluateTestUseCase";
import { EvaluateTest } from "../../application/usecases/user/EvaluateTestUseCase";
import { IGetQuestionUseCase } from "../../application/interfaces/user/IGetQuestionUseCase";
import { GetQuestionUseCase } from "../../application/usecases/user/GetQuestionUseCase";
import { IGetAllTestsUseCase } from "../../application/interfaces/admin/IGetAllTestsUseCase";
import { GetAllTestsUseCase } from "../../application/usecases/admin/GetAllTestsUseCase";
import { IUpdateTestUseCase } from "../../application/interfaces/admin/IUpdateTestUseCase";
import { UpdateTestUseCase } from "../../application/usecases/admin/UpdateTestUseCase";





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
        return new DeleteStackUseCase(this._stackRepositary, this._questionRepositary)
    }


    ///questions

    public createQuestionUseCase(): ICreateQuestionUseCase {
        return new CreateQuestionUseCase(this._questionRepositary)
    }

    public deleteQuestionUseCase(): IDeleteQuestionUseCase {
        return new DeleteQuestionUseCase(this._questionRepositary)
    }

    public getAllQuestionByStackId(): IGetAllQuestionByStack {
        return new GetAllQuestions(this._questionRepositary)
    }


    //test

    public createTestUseCase(): ICreateTestUseCase {
        return new CreateTestUseCase(this._testRepositary, this._questionRepositary)
    }

    public valuateTestUseCase(): IEvaluateTestUseCase {
        return new EvaluateTest(this._testRepositary, this._questionRepositary)
    }
    //this for fetch one by one questionfor each reqiest when test change
    public getQuestionUseCase(): IGetQuestionUseCase {
        return new GetQuestionUseCase(this._questionRepositary)
    }

    //test admin
    public getAllTestUseCase(): IGetAllTestsUseCase {
        return new GetAllTestsUseCase(this._testRepositary)
    }

    public updateTestUseCase(): IUpdateTestUseCase {
        return new UpdateTestUseCase(this._testRepositary);
    }
}