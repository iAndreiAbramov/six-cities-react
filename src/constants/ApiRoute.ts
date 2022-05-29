export const ApiRoute = {
    Hotel: (id: string): string => `/hotels/${id}`,
    Hotels: (): string => '/hotels',
    Login: (): string => '/login',
    Logout: (): string => '/logout',
};
