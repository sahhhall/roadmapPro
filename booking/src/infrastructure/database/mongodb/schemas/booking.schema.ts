import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDoc } from "./usermentor.schema";
import { BookinStatus } from '@sahhhallroadmappro/common'

interface BookingAttr {
    menteeId: string;
    mentorId: string;
    date: string;
    status?:BookinStatus;
    paymentStatus?: 'pending' | 'paid' | 'refunded';
    expiresAt: Date;
    videoCallLink?: string;
    cancelledAt?: Date;
}


interface BookingDoc extends Document {
    menteeId: UserDoc;
    mentorId: UserDoc;
    date: string;
    status: BookinStatus;
    paymentStatus: 'pending' | 'paid' | 'refunded';
    expiresAt: Date;
    videoCallLink?: string;
    id: string;
    cancelledAt?: Date;
}


interface BookingModel extends Model<BookingDoc> {
    build(attrs: BookingAttr): BookingDoc;
}


const bookingSchema = new Schema<BookingDoc>(
    {
        menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserBooking' },
        mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserBooking' },
        date: { type: String, required: true },
        status: {
            type: String,
            enum: Object.values(BookinStatus),
            default: BookinStatus.Created
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'refunded'],
            default: 'pending'
        },
        expiresAt: {
            type: mongoose.Schema.Types.Date,
        },
        videoCallLink: { type: String },
        cancelledAt: { type: Date },
    },
    {
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);


bookingSchema.statics.build = (attrs: BookingAttr) => {
    return new Booking(attrs);
};


const Booking = mongoose.model<BookingDoc, BookingModel>("Booking", bookingSchema);

export { Booking };
