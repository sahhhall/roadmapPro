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
import { LoginAdmin } from "../../application/usecases/admin/LoginAdmin";
import { FetchUsers } from "../../application/usecases/admin/FetchUsers";
import { GoogleLogin } from "../../application/usecases/user/GoogleLogin";
import { BlockUser } from "../../application/usecases/admin/BlockUser";
import { ResetPasswordToken } from "../../application/usecases/user/ResetPassword";
import { SendLinkResetPassword } from "../../application/usecases/user/SendLinkResetPass";
import { VerifyPasswordReset } from "../../application/usecases/user/VerifyPasswordReset";
import { RefreshToken } from "../../application/usecases/user/RefreshToken";
import { AdminRefreshToken } from "../../application/usecases/admin/AdminRefreshToken";
import { UpdateAuthRole } from "../../application/usecases/user/UpdateAuthRole";


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

    static getLoginAdminUserCase() {
        return new LoginAdmin(this._authRepository, this._jwtService)
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
        return new OtpVerification(this._rediseService, this._authRepository, this._jwtService)
    }

    static getAllUsersUseCase() {
        return new FetchUsers(this._authRepository)
    }

    static getGoogleLoginUseCase() {
        return new GoogleLogin(this._authRepository, this._jwtService)
    }

    static blockUserUseCase() {
        return new BlockUser(this._authRepository);
    }

    static resetPasswordTokenUseCase() {
        return new ResetPasswordToken(this._rediseService, this._authRepository);
    }
    static SendLinkResetPasswordUseCase() {
        return new SendLinkResetPassword(this._nodeMailerService)
    }
    static confirmPasswordResetUseCase() {
        return new VerifyPasswordReset(this._rediseService, this._authRepository)
    }
    static refreshTokenUserUseCase() {
        return new RefreshToken(this._jwtService)
    }
    static adminRefeshTokenUseCase() {
        return new AdminRefreshToken(this._jwtService)
    }

    static updateRoleAuthUseCase() {
        return new UpdateAuthRole(this._authRepository)
    }
}


// class DIContainer {
//     private static instance: DIContainer;
//     private _authRepository: UserRepository;
//     private _jwtService: JwtService;
//     private _redisService: RedisUserRepository;
//     private _otpService: OTPService;
//     private _nodeMailerService: NodeMailerService;

//     private constructor() {
//         this._authRepository = new UserRepository();
//         this._jwtService = new JwtService();
//         this._redisService = new RedisUserRepository();
//         this._otpService = new OTPService();
//         this._nodeMailerService = new NodeMailerService();
//     }

//     public static getInstance(): DIContainer {
//         if (!DIContainer.instance) {
//             DIContainer.instance = new DIContainer();
//         }
//         return DIContainer.instance;
//     }


//     public getRegisterUserUseCase(): RegisterUser {
//         return new RegisterUser(this._authRepository);
//     }

//     public getLoginUserUseCase(): LoginUser {
//         return new LoginUser(this._authRepository, this._jwtService);
//     }

//     public getLoginAdminUseCase(): LoginAdmin {
//         return new LoginAdmin(this._authRepository, this._jwtService);
//     }

//     public getUserUseCase(): GetUser {
//         return new GetUser(this._authRepository);
//     }

//     public getTemporaryStorageUseCase(): RegisterUserTemporarily {
//         return new RegisterUserTemporarily(this._redisService, this._otpService);
//     }

//     public getEmailServiceUseCase(): SendOtpEmailUseCase {
//         return new SendOtpEmailUseCase(this._nodeMailerService);
//     }

//     public getResendOtpUseCase(): ResendOTP {
//         return new ResendOTP(this._redisService, this._otpService);
//     }

//     public getAllUsersUseCase(): FetchUsers {
//         return new FetchUsers(this._authRepository);
//     }

//     public verifyUserUseCase(): OtpVerification {
//         return new OtpVerification(this._redisService, this._authRepository);
//     }
// }


export { DIContainer }