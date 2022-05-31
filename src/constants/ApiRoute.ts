export const ApiRoute = {
    Comments: (id: string): string => `/comments/${id}`,
    Nearby: (id: string): string => `/hotels/${id}/nearby`,
    Hotel: (id: string): string => `/hotels/${id}`,
    Hotels: (): string => '/hotels',
    Login: (): string => '/login',
    Logout: (): string => '/logout',
};
