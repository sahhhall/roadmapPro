import mongoose, { ObjectId } from "mongoose";

export class Roadmap {
    constructor(
        public userId: mongoose.Types.ObjectId,
        public title: string,
        public description: string,
        public status: 'drafted' | 'published' | 'rejected' = 'drafted',
        public nodes: mongoose.Types.ObjectId[] = [],
        public edges: mongoose.Types.ObjectId[] = [],
        public adminFeedback: string = '',
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }
}

export class Node {
    constructor(
        public type: string,
        public position: { x: number, y: number },
        public data: string,
        public hasDetails: boolean = false,
        public details?: NodeDetails,
        public id?: string
    ) { }
}

export class NodeDetails {
    constructor(
        public nodeId: mongoose.Types.ObjectId,
        public title: string,
        public description: string = '',
        public links: Array<{ title: string; url: string }> = [],
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }
}

export class Link {
    constructor(
        public id: string,
        public type: string,
        public title: string,
        public url: string
    ) { }
}

export class Edge {
    constructor(
        public source: string,
        public target: string,
        public id?: string
    ) { }
}
