import mongoose from "mongoose";

interface StackAttr {
    name: string;
}


interface StackModal extends mongoose.Model<StackDoc> {
    build(attributes: StackAttr): StackDoc;
}

interface StackDoc extends mongoose.Document {
    id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}


const stackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(_, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
    timestamps: true,
});


stackSchema.statics.build = (attrs: StackAttr) => {
    return new Stack(attrs)
}

const Stack = mongoose.model<StackDoc, StackModal>('Stack', stackSchema);

export { Stack }