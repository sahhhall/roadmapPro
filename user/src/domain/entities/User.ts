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
        public userId: string,
        public assessedSkills: string[],
        public headline: string,
        public bio: string,
        public githubUrl: string,
        public linkedinUrl: string,
        public experience: string,
        public sessionPrice: number = 0,
        public totalEarnings: number = 0,
        public totalMeetings: number = 0
    ) { }
}