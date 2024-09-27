import { LoginUser } from "../../application/usecases/user/LoginUser";
import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { UserRepository } from "../repositories/UserRepository";
import { JwtService } from "../services/JwtService";


class DIContainer {
    private static _authRepository = new UserRepository();
    private static _jwtService = new JwtService();

    static getAuthRepositary() {
        return this._authRepository;
    }

    static getRegisterUserUseCase() {
        return new RegisterUser(this._authRepository);
    }

    static getLoginUserUseCase () {
        return new LoginUser(this._authRepository, this._jwtService )
    }
}


export { DIContainer }