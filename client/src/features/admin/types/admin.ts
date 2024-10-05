export interface LoginCredentials {
    email: string;
    password: string;
}


export interface Blockdata {
    email: string
}

export interface IUser {
    name: string;
    email: string;
    role: string;
    avatar: string;
    isAdmin: boolean;
    isActive: boolean;
    isGoogle: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
}