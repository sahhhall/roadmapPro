import mongoose from "mongoose";

interface QuestionAttr {
    stackId: mongoose.Types.ObjectId;
    question: string;
    options: string[];
    correctAnswer: string;

}

interface QuestionModel extends mongoose.Model<QuestionDoc> {
    build(attributes: QuestionAttr): QuestionDoc;
}

interface QuestionDoc extends mongoose.Document {
    stackId: mongoose.Types.ObjectId;
    question: string;
    options: string[];
    correctAnswer: string;
    createdAt: Date;
    updatedAt: Date;
}



const questionSchema = new mongoose.Schema({
    stackId: {
        types: mongoose.Types.ObjectId,
        ref: 'Stack',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
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


questionSchema.statics.build = (attrs: QuestionAttr) => {
    return new Question(attrs);
}

const Question = mongoose.model<QuestionDoc, QuestionModel>('Question', questionSchema);

export { Question }