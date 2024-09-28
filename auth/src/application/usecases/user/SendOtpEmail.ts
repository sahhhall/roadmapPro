import { IEmailService } from "../../../domain/interfaces/IEmailService";

interface SendOtpEmailInput {
    email: string;
    name: string;
    otp: string;
}

export class SendOtpEmailUseCase {
    constructor(private emailService: IEmailService) { }

    async execute(input: SendOtpEmailInput): Promise<void| boolean> {
        try {
            const subject = "Your OTP Code";
            const body = `Hi ${input.name},\n\nYour OTP code is: ${input.otp}.\nPlease use this code to verify your account.\n\nThank you!`;
            await this.emailService.sendMail(input.email, subject, body);
            return true
        } catch (error) {
            console.log(error);
            return true
        }

    }
}