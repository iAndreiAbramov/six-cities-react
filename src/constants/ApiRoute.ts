import { FavoriteStatus } from './FavoriteStatus';

export const ApiRoute = {
    Comments: (id: string): string => `/comments/${id}`,
    FavoriteGet: (): string => '/favorite',
    FavoritePost: (id: string, status: FavoriteStatus): string => `/favorite/${id}/${status}`,
    Nearby: (id: string): string => `/hotels/${id}/nearby`,
    Hotel: (id: string): string => `/hotels/${id}`,
    Hotels: (): string => '/hotels',
    Login: (): string => '/login',
    Logout: (): string => '/logout',
};
