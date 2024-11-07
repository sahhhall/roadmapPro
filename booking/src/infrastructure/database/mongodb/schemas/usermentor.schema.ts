import mongoose, { Schema, Document, Model } from "mongoose";


interface UserAttr {
    role?: string; 
    _id: string; 
    email: string; 
    avatar?: string; 
    name: string; 
}


export interface UserDoc extends Document {
    role: string; 
    _id: string; 
    email: string;
    avatar?: string; 
    name: string; 
}


interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttr): UserDoc; 
}


const userSchema = new Schema<UserDoc>(
    {
        role: { type: String, default: "user" },
        email: { type: String, required: true, unique: true },
        avatar: { type: String },
        name: { type: String, required: true },
    },
    {
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id; 
                delete ret._id;
                delete ret.__v; 
            },
        }
    }
);


userSchema.statics.build = (attrs: UserAttr) => {
    return new UserBooking(attrs); 
};



const UserBooking = mongoose.model<UserDoc, UserModel>("UserBooking", userSchema);

export { UserBooking };
