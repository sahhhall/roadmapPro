export class User {
    constructor(
        public name: string,
        public email: string,
        public role?: string,
        public avatar?: string,
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }
}
