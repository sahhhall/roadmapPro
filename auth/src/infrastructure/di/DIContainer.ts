import { OTPService } from "../../application/services/OTPService";
import { GetUser } from "../../application/usecases/user/GetUser";
import { LoginUser } from "../../application/usecases/user/LoginUser";
import { OtpVerification } from "../../application/usecases/user/OtpVerfication";
import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { RegisterUserTemporarily } from "../../application/usecases/user/RegisterUserTemporarily";
import { ResendOTP } from "../../application/usecases/user/ResendOtp";
import { SendOtpEmailUseCase } from "../../application/usecases/user/SendOtpEmail";
import { RedisUserRepository } from "../repositories/CacheUserRepo";
import { UserRepository } from "../repositories/UserRepository";
import { JwtService } from "../external-services/JwtService";
import { NodeMailerService } from "../external-services/NodeMailerService";


class DIContainer {
    private static _authRepository = new UserRepository();
    private static _jwtService = new JwtService();
    private static _rediseService = new RedisUserRepository();
    private static _otpService = new OTPService()
    private static _nodeMailerService = new NodeMailerService()
    static getAuthRepositary() {
        return this._authRepository;
    }

    static getRegisterUserUseCase() {
        return new RegisterUser(this._authRepository);
    }

    static getLoginUserUseCase() {
        return new LoginUser(this._authRepository, this._jwtService)
    }

    static getUserUseCase() {
        return new GetUser(this._authRepository)
    }

    static getTemporaryStorUseCase() {
        return new RegisterUserTemporarily(this._rediseService, this._otpService)
    }

    static getEmailServiceUseCase() {
        return new SendOtpEmailUseCase(this._nodeMailerService)
    }
    static getResendOtpUseCase() {
        return new ResendOTP(this._rediseService, this._otpService)
    }
    static verifyUserUserCase() {
        return new OtpVerification(this._rediseService, this._authRepository)
    }
}


export { DIContainer }