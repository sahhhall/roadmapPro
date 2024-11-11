import { Repository } from "typeorm";
import { IPaymentRepositary } from "../../domain/interfaces/IPayment";
import { Payment } from "../database/sql/entities/payment.entity";
import { AppDataSource } from "../database/sql/connection";
import { PaymentEntity, PaymentStatus } from "../../domain/entities/PaymentEntity";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";







export class PaymentRepositary implements IPaymentRepositary {
    private repository: Repository<Payment>

    private handleDBError(action: string, details: string, error: Error) {
        const errorMessage = `DB error: Failed to ${action}. Details: ${details} - ${error.message}`;
        customLogger.error(errorMessage);
        throw new Error(errorMessage);
    }

    constructor() {
        this.repository = AppDataSource.getRepository(Payment)
    }

    async createPayment(paymentData: Partial<PaymentEntity>): Promise<PaymentEntity | any> {
        try {
            const payment = this.repository.create(paymentData);
            return await this.repository.save(payment);
        } catch (error: any) {
            this.handleDBError("create payment", `Data: ${JSON.stringify(paymentData)}`, error);
        }
    }

    async updatePaymentStatus(paymentId: string, status: PaymentStatus): Promise<PaymentEntity | any> {
        try {
            await this.repository.update(paymentId, { status });
            return await this.repository.findOneOrFail({ where: { id: paymentId } });
        } catch (error: any) {
            this.handleDBError("update payment status", `Payment ID: ${paymentId}, Status: ${status}`, error);
        }
    }
    async findByPaymentId(paymentId: string): Promise<PaymentEntity | any> {
        try {
            return await this.repository.findOne({ where: { paymentId } });
        } catch (error: any) {
            this.handleDBError("find payment by ID", `Payment ID: ${paymentId}`, error);
        }
    }

    async findByUserId(userId: string): Promise<PaymentEntity[] | any> {
        try {
            return await this.repository.find({ where: { userId } });
        } catch (error: any) {
            this.handleDBError("find payments by user ID", `User ID: ${userId}`, error);
        }
    }
}