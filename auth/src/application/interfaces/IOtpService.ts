// application/interfaces/IOtpService.ts
export interface IOtpService {
    generateOtp(): string;
    // validateOtp(email: string, otp: string): Promise<boolean>;
}