import { IOtpService } from "../interfaces/IOtpService";


export class OTPService implements IOtpService {
    generateOtp(): string{
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
}

