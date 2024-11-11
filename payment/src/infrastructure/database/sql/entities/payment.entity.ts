import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum PaymentStatus {
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded'
}
@Entity()
export class Payment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: 'varchar',
        length: 24,
    })
    userId: string;

    @Column({
        type: 'varchar',
        length: 24,
    })
    mentorId: string

    @Column({ type: 'decimal' })
    amount: number

    @Column({
        type: 'enum',
        enum: PaymentStatus,
    })
    status: string

    @Column({ unique: true })
    paymentId: string;

    @Column({
        type: 'varchar',
        length: 24
    })
    bookingId: string;

    @CreateDateColumn()
    transactionDate: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

}


