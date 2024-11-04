import { IUserCreatedUseCase } from "../../application/interfaces/IUserCreatedUseCase";
import { UserCreatedUseCase } from "../../application/usecases/UserCreatedUseCase";
import { IUserRepository } from "../../domain/interfaces/IUserRepositary";
import { UserRepository } from "../repositories/UserRepositary";



export class DIContainer {
    private static instance: DIContainer;
    private _userRepositary: IUserRepository;
    private constructor() {
        this._userRepositary = new UserRepository();
    }

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer()
        }
        return DIContainer.instance;
    };

    //for kafka
    public userCreatedUseCase(): IUserCreatedUseCase {
        return new UserCreatedUseCase(this._userRepositary);
    }


}