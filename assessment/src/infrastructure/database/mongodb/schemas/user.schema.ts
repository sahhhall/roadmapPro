import mongoose from "mongoose";

interface UserAttr {
    id: string;
    name: string;
    email: string;
    role?: string;
    avatar?: string;
    assessed_skills?: string | string[];
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attributes: UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document {
    name: string;
    email: string;
    role: string;
    avatar?: string;
    assessed_skills: string[];
    createdAt: Date;
    updatedAt: Date;
    id: string
}

const userSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            default: "user",
        },
        assessed_skills: {
            type: [String],
            default: []
        },
        avatar: {
            type: String,
        }
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
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
