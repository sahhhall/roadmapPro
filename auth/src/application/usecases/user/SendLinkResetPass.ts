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
            const subject = "Reset Your Password";
            const encodedEmail = input.email;
            const resetPasswordUrl = `http://${process.env.FRONT_END_BASE_URL}/reset-password?code=${input.token}&email=${encodedEmail}`;
            
            const body = `Hi ${input.name},\n\n` +
                `Please click the link below to reset your password:\n\n` +
                `${resetPasswordUrl}\n\n` +
                `If you didn't request this, you can safely ignore this email.`;

            await this.emailService.sendMail(input.email, subject, body);
            return true;
        } catch (error) {
            console.log(error);
            return false; 
        }
    }
}
