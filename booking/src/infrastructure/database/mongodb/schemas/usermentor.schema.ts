import mongoose, { Schema, Document, Model } from "mongoose";


interface UserAttr {
    role?: string;
    _id: string;
}


interface UserModel extends Model<UserDoc> {
    build(attributes: UserAttr): UserDoc;
}

interface UserDoc extends Document {
    role: string;
    _id: string;
}




const userSchema = new Schema<UserDoc>(
    {
        role: { type: String, default: "user" },
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



userSchema.statics.build = (attrs: UserAttr) => {
    return new UserBooking(attrs);
};

const UserBooking = mongoose.model<UserDoc, UserModel>("UserBooking", userSchema);

export { UserBooking };
