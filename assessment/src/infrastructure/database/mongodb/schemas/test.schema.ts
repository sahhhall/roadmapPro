import mongoose from "mongoose";

interface TestAttr {
    userId: string;
    stackId: string;
    expirience: string;
    certificate: string;
    description: string;
    duration: number;
    status: 'pending' | 'in-progress' | 'completed';
    score?: number;
    questions: {
        questionId: mongoose.Types.ObjectId | string;
        userAnswer?: string;
        isCorrect?: boolean;
    }[];
    reviewAt?: Date;
}

interface TestModel extends mongoose.Model<TestDoc> {
    build(attributes: TestAttr): TestDoc;
}

interface TestDoc extends mongoose.Document {
    id: string;
    userId: string;
    stackId: string;
    expirience: string;
    certificate: string;
    description: string;
    duration: number;
    status: 'pending' | 'in-progress' | 'completed';
    score?: number;
    questions: {
        questionId: mongoose.Types.ObjectId;
        userAnswer?: string;
        isCorrect?: boolean;
    }[];
    reviewAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const testSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stackId: {
        type: mongoose.Types.ObjectId,
        ref: 'Stack',
        required: true,
    },
    expirience: {
        type: String,
        required: true,
    },
    certificate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true, 
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending', 
    },
    score: {
        type: Number,
        default: 0, 
    },
    questions: [{
        questionId: {
            type: mongoose.Types.ObjectId,
            ref: 'Question',
        },
        userAnswer: {
            type: String,
        },
        isCorrect: {
            type: Boolean,
        },
    }],
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


testSchema.statics.build = (attrs: TestAttr) => {
    return new Test(attrs);
};

const Test = mongoose.model<TestDoc, TestModel>('Test', testSchema);

export { Test };
