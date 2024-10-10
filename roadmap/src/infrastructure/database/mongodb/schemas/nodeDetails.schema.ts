import mongoose, { Mongoose } from "mongoose";


interface NodeDetailsAttrs {
    nodeId: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    links?: Array<{ title: string; url: string }>;
}

interface NodeDetailsDoc extends mongoose.Document {
    nodeId: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    links?: Array<{ title: string; url: string }>;
};

interface NodeDetailsModal extends mongoose.Model<NodeDetailsDoc> {
    build(attrs: NodeDetailsAttrs): NodeDetailsDoc
};


const nodeDetailsSchema = new mongoose.Schema({
    nodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Node',
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
    links: [{
        title: { type: String, required: true },
        url: { type: String, required: true }
    }]
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

nodeDetailsSchema.statics.build = (attrs: NodeDetailsAttrs) => {
    return new NodeDetails(attrs)
}


const NodeDetails = mongoose.model<NodeDetailsDoc, NodeDetailsModal>('NodeDetails', nodeDetailsSchema);

export { NodeDetails }