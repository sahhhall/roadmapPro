import mongoose, { Schema, Document, Model } from "mongoose";


interface BookingAttr {
    menteeId: string;
    mentorId: string;
    startTime: Date;
    endTime: Date;
    date: Date;
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    paymentStatus?: 'pending' | 'paid' | 'refunded';
    videoCallLink?: string;
    cancelledAt?: Date;
}


interface BookingDoc extends Document {
    menteeId: string;
    mentorId: string;
    startTime: Date;
    date: Date;
    endTime: Date;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'refunded';
    videoCallLink?: string;
    cancelledAt?: Date;
}


interface BookingModel extends Model<BookingDoc> {
    build(attrs: BookingAttr): BookingDoc;
}


const bookingSchema = new Schema<BookingDoc>(
    {
        menteeId: { type: String, required: true },
        mentorId: { type: String, required: true },
        date: { type: Date, required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'completed', 'cancelled'],
            default: 'pending'
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'refunded'],
            default: 'pending'
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
