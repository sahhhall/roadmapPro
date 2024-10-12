import mongoose from 'mongoose';


interface RoadMapAttr {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: 'drafted' | 'published' | 'rejected';
    nodes?: mongoose.Types.ObjectId[]; 
    edges?: mongoose.Types.ObjectId[];  
    adminFeedback?: string;
}


interface RoadMapDoc extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: 'drafted' | 'published' | 'rejected';
    nodes: mongoose.Types.ObjectId[]; 
    edges: mongoose.Types.ObjectId[];  
    adminFeedback: string;
}


interface RoadMapModel extends mongoose.Model<RoadMapDoc> {
    build(attrs: RoadMapAttr): RoadMapDoc;
}


const roadmapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['drafted', 'published', 'rejected']
    },
    nodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Node',
        default:[]
    }],
    edges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Edge',
        default:[]
    }],
    adminFeedback:{
        type: String
    }
}, {
    toJSON: {
        transform(_, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true
});


roadmapSchema.statics.build = (attrs: RoadMapAttr) => {
    return new RoadMap(attrs);
};


const RoadMap = mongoose.model<RoadMapDoc, RoadMapModel>('RoadMap', roadmapSchema);

export { RoadMap };
