export class User {
    constructor(
        public role: string,
        public id: string,
        public name: string, 
        public email: string, 
        public avatar?: string, 
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }
}