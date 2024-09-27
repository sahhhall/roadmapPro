import { RegisterUser } from "../../application/usecases/RegisterUser";
import { UserRepository } from "../repositories/UserRepository";


class DIContainer {
    private static _authRepository = new UserRepository();

    static getAuthRepositary() {
        return this._authRepository;
    }

    static getRegisterUserUseCase() {
        return new RegisterUser(this._authRepository);
    }
}


export { DIContainer }