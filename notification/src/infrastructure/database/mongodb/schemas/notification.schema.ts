import mongoose from "mongoose";
import { Types } from "../../../../shared/type.enum";

interface NotificationAttr {
    userMail: string;
    type: Types;
    message: string;
    senderName?: string;
    isRead?: boolean;
    link?: string;
}

interface NotificationModel extends mongoose.Model<NotificationDoc> {
    build(attributes: NotificationAttr): NotificationDoc;
}

interface NotificationDoc extends mongoose.Document {
    userMail: string;
    type: Types;
    message: string;
    senderName?: string;
    isRead: boolean;
    link?: string;
}

const notificationSchema = new mongoose.Schema(
    {
        userMail: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(Types),
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        senderName: {
            type: String,
        },
        link: {
            type: String,
        },
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

notificationSchema.statics.build = (attrs: NotificationAttr) => {
    return new Notification(attrs);
};

const Notification = mongoose.model<NotificationDoc, NotificationModel>(
    "Notification",
    notificationSchema
);

export { Notification };
