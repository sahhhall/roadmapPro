import mongoose from 'mongoose';


interface NodeAttr {
    roadmapId: mongoose.Types.ObjectId;
    type: string;
    position: { x: number, y: number };
    data: string;
}


interface NodeDoc extends mongoose.Document {
    roadmapId: mongoose.Types.ObjectId;
    type: string;
    position: { x: number, y: number };
    data: string;
    hasDetails: boolean;
}


interface NodeModal extends mongoose.Model<NodeDoc> {
    build(attrs: NodeAttr): NodeDoc;
}


const nodeSchema = new mongoose.Schema({
    roadmapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoadMap',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    data: {
        type: String,
        required: true
    },
    hasDetails: {
        type: Boolean,
        default: false
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


nodeSchema.statics.build = (attrs: NodeAttr) => {
    return new Node(attrs);
};


const Node = mongoose.model<NodeDoc, NodeModal>('Node', nodeSchema);

export { Node };
