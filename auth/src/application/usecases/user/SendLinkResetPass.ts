import { IEmailService } from "../../interfaces/IEmailService";

interface SendOtpEmailInput {
    email: string;
    name: string;
    token: string;
}

export class SendLinkResetPassword {
    constructor(private emailService: IEmailService) { }

    async execute(input: SendOtpEmailInput): Promise<void | boolean> {
        try {
            const subject = "Reset Password";
            const resetPasswordUrl = `http://localhost:5173/reset-password?code=${input.token}`;
            const body = `Hi ${input.name},\n\n` +
                `Please click the link below to reset your password:\n\n` +
                `${resetPasswordUrl}\n\n` +
                `if you didn't request this, you can safely ignore this email`;

            await this.emailService.sendMail(input.email, subject, body);
            return true
        } catch (error) {
            console.log(error);
            return true
        }

    }
}