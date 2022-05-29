export const ApiRoute = {
    Comments: (id: string): string => `/comments/${id}`,
    Hotel: (id: string): string => `/hotels/${id}`,
    Hotels: (): string => '/hotels',
    Login: (): string => '/login',
    Logout: (): string => '/logout',
};
