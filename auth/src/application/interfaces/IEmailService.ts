export interface IEmailService {
    sendMail(to: string, subject: string, body: string): Promise<void>;
}
