import mongoose, { Schema, Document, Model } from "mongoose";


interface MentorAttr {
    assessedSkills: string[];
    headline: string;
    bio: string;
    githubUrl: string;
    linkedinUrl: string;
    expirience: string;
    sessionPrice?: number;
    totalEarnings?: number;
    totalMeetings?: number;
}


interface MentorModel extends Model<MentorDoc> {
    build(attributes: MentorAttr): MentorDoc;
}

interface MentorDoc extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    assessedSkills: string[];
    headline: string;
    bio: string;
    githubUrl: string;
    linkedinUrl: string;
    expirience: string;
    sessionPrice?: number;
    totalEarnings?: number;
    totalMeetings?: number;
    createdAt: Date;
    updatedAt: Date;
}




const mentorSchema = new Schema<MentorDoc>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        assessedSkills: { type: [String], required: true },
        headline: { type: String, required: true },
        bio: { type: String, required: true },
        githubUrl: { type: String, required: true },
        linkedinUrl: { type: String, required: true },
        expirience: { type: String, required: true },
        sessionPrice: { type: Number, default: 0 },
        totalEarnings: { type: Number, default: 0 },
        totalMeetings: { type: Number, default: 0 },
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



mentorSchema.statics.build = (attrs: MentorAttr) => {
    return new Mentor(attrs);
};

const Mentor = mongoose.model<MentorDoc, MentorModel>("Mentor", mentorSchema);

export { Mentor };