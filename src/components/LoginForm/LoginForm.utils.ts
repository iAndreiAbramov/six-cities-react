import { IUserAuthRequest } from 'types/user-auth.types';

type IUserAuthErrors = Record<keyof IUserAuthRequest, string | undefined>;

export const EMAIL_PATTERN = new RegExp(
    "(?!(^[.-].*|[^@]*[.-]@|.*\\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~.-]+@)(?!-.*|.*-\\.)([a-zA-Z0-9-]{1,63}\\.)+[a-zA-Z]{2,15}",
);

export const PASSWORD_PATTERN = new RegExp('[a-zа-яё]+[0-9]+|[0-9]+[a-zа-яё]+', 'gi');

export const validateLoginForm = (values: IUserAuthRequest): IUserAuthErrors => {
    const errors = {} as IUserAuthErrors;
    const { email, password } = values;

    if (!email) {
        errors.email = 'Email is required';
    }

    if (EMAIL_PATTERN.exec(email) === null) {
        errors.email = 'Valid email required. Try something like example@fake.com';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    if (PASSWORD_PATTERN.exec(password) === null) {
        errors.password = 'Password must include one letter and one digit as minimum';
    }

    return errors;
};
