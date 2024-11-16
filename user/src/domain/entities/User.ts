export class User {
    constructor(
        public name: string,
        public email: string,
        public role?: string,
        public avatar?: string,
        public isGoogle: boolean = false,
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }
}


export class Mentor {
    constructor(
        public userId: any,
        public assessedSkills: string[],
        public languages: string[],
        public headline: string,
        public bio: string,
        public githubUrl: string,
        public linkedinUrl: string,
        public expirience: string,
        public sessionPrice?: number,
        public totalEarnings?: number,
        public totalMeetings?: number,
    ) { }
}