export enum PaymentStatus {
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded'
}

export class PaymentEntity {
    constructor(
        public id: string,
        public mentorId: any,
        public userId: string,
        public amount: number,
        public status: PaymentStatus,
        public paymentId: string,
        public bookingId: string,
        public transactionDate: Date,
        public updatedAt?: Date,
    ) { }
}
