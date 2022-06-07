import { ErrorMessage } from 'constants/ErrorMessage';
import { IUserAuthRequest } from 'types/user-auth.types';

type IUserAuthErrors = Record<keyof IUserAuthRequest, ErrorMessage | undefined>;

export const EMAIL_PATTERN = new RegExp(
    "(?!(^[.-].*|[^@]*[.-]@|.*\\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~.-]+@)(?!-.*|.*-\\.)([a-zA-Z0-9-]{1,63}\\.)+[a-zA-Z]{2,15}",
);

export const PASSWORD_PATTERN = new RegExp('[a-zа-яё]+[0-9]+|[0-9]+[a-zа-яё]+', 'gi');

export const validateLoginForm = (values: IUserAuthRequest): IUserAuthErrors => {
    const errors = {} as IUserAuthErrors;
    const { email, password } = values;

    if (!email) {
        errors.email = ErrorMessage.EmailIsRequired;
    }

    if (email && EMAIL_PATTERN.exec(email) === null) {
        errors.email = ErrorMessage.EmailInvalid;
    }

    if (!password) {
        errors.password = ErrorMessage.PasswordIsRequired;
    }

    if (password && PASSWORD_PATTERN.exec(password) === null) {
        errors.password = ErrorMessage.PasswordInvalid;
    }

    return errors;
};
