import mongoose from "mongoose";



interface EdgeAttr {
    source: mongoose.Types.ObjectId;
    target: mongoose.Types.ObjectId
}


interface EdgeDoc extends mongoose.Document {
    source: mongoose.Types.ObjectId;
    target: mongoose.Types.ObjectId
};


interface EdgeModal extends mongoose.Model<EdgeDoc> {
    build(attrs: EdgeAttr): EdgeDoc
}


const edgeSchmea = new mongoose.Schema({
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