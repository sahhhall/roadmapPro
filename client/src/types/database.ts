// for all responss 

export interface IUser {
    id: string,
    name: string,
    email: string,
    avatar: string,
    role: string,
}

export interface IUserData {
    users: [{
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
    }]
}