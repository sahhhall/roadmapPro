


import { PaymentEntity, PaymentStatus } from "../../domain/entities/PaymentEntity";

export interface IPaymentRepositary {
    createPayment(paymentData: Partial<PaymentEntity>): Promise<PaymentEntity>
    updatePaymentStatus(paymentId: string, status: PaymentStatus):  Promise<PaymentEntity>
    findByPaymentId(paymentId: string) :  Promise<PaymentEntity | null>
    findByUserId(userId: string): Promise<PaymentEntity[]>
    getTotalRevenue(): Promise<number | undefined>;
}