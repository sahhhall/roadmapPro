import mongoose from "mongoose";


export class Stack {
    constructor(
        public name: string,
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }
}

export class Question {
    constructor(
        public stackId: mongoose.Types.ObjectId,
        public question: string,
        public options: string[],
        public correctAnswer: string,
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }
}

export class TestQuestion {
    constructor(
        public questionId: mongoose.Types.ObjectId | string,
        public userAnswer?: string | undefined,
        public isCorrect?: boolean | undefined
    ) { }
}

export class Test {
    constructor(
        public userId: string,
        public stackId: string,
        public expirience: string,
        public certificate: string,
        public description: string,
        public duration: number,
        public status: 'pending' | 'in-progress' | 'completed' = 'pending',
        public score?: number ,
        public questions: TestQuestion[] = [],
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }   
}