

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData extends LoginCredentials {
    name: string;
    avatar?: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface AuthResponse {
    token: string;
    user: UserData;
}

export interface UserData {
    id: string;
    name: string;
    email: string;
}