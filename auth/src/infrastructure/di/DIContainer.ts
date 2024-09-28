import { OTPService } from "../../application/services/OTPService";
import { GetUser } from "../../application/usecases/user/GetUser";
import { LoginUser } from "../../application/usecases/user/LoginUser";
import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { RegisterUserTemporarily } from "../../application/usecases/user/RegisterUserTemporarily";
import { RedisUserRepository } from "../repositories/RedisUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import { JwtService } from "../services/JwtService";


class DIContainer {
    private static _authRepository = new UserRepository();
    private static _jwtService = new JwtService();
    private static _rediseService = new RedisUserRepository();
    private static _otpService = new OTPService()

    static getAuthRepositary() {
        return this._authRepository;
    }

    static getRegisterUserUseCase() {
        return new RegisterUser(this._authRepository);
    }

    static getLoginUserUseCase () {
        return new LoginUser(this._authRepository, this._jwtService )
    }

    static getUserUseCase() {
        return new GetUser(this._authRepository)
    }

    static getTemporaryStorUseCase() {
        return new RegisterUserTemporarily(this._rediseService, this._otpService)
    }
}


export { DIContainer }