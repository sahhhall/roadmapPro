import mongoose from "mongoose";



interface EdgeAttr {
    roadmapId: mongoose.Types.ObjectId;
    source: mongoose.Types.ObjectId;
    target: mongoose.Types.ObjectId
}


interface EdgeDoc extends mongoose.Document {
    roadmapId: mongoose.Types.ObjectId;
    source: mongoose.Types.ObjectId;
    target: mongoose.Types.ObjectId
};


interface EdgeModal extends mongoose.Model<EdgeDoc> {
    build(attrs: EdgeAttr): EdgeDoc
}


const edgeSchmea = new mongoose.Schema({
    roadmapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoadMap',
        required: true
    },
    source: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Node',
        required: true
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Node',
        required: true
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


edgeSchmea.statics.build = (attrs: EdgeAttr) => {
    return new Edge(attrs)
}

const Edge = mongoose.model<EdgeDoc, EdgeModal>('Edge', edgeSchmea);

export { Edge }