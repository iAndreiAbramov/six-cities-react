export const AppRoute = {
    Home: (): string => `/`,
    Hotel: (id: string): string => `/hotel/${id}`,
    Favorites: (): string => `/favorites`,
    Login: (): string => '/login',
};
