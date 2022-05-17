export interface IUserAuthRequest {
    email: string;
    password: string;
}

export interface IUserAuthResponse {
    avatar_url: string;
    email: string;
    id: number;
    is_pro: boolean;
    name: string;
    token: string;
}

export type UserStoredDataTypes = Omit<IUserAuthResponse, 'token'>;
