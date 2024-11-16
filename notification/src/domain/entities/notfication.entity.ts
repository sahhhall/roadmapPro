import { Types } from "../../shared/type.enum";

export class Notification {
    constructor(
        public userMail: string,
        public type: Types,
        public message: string,
        public senderName?: string,
        public isRead: boolean = false,
        public link?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }
}
