const AUTH_TOKEN = 'six-cities-token';

export const setToken = (token: string): void => {
    localStorage.setItem(AUTH_TOKEN, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(AUTH_TOKEN);
};

export const dropToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN);
};
