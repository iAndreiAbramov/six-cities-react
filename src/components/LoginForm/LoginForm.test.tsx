import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from 'constants/ErrorMessage';

import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
    const handleFormSubmit = jest.fn((values) => alert(values));

    it('should render correctly', () => {
        render(<LoginForm handleFormSubmit={handleFormSubmit} />);

        expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toHaveAttribute('name', 'email');
        expect(screen.getByPlaceholderText('Password')).toHaveAttribute('name', 'password');
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should update values and call a callback', () => {
        render(<LoginForm handleFormSubmit={(values) => handleFormSubmit(values)} />);

        const button = screen.getByRole('button', { name: /sign in/i });
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        expect(button).toBeEnabled();
        userEvent.click(button);
        expect(handleFormSubmit).toBeCalledTimes(0);

        userEvent.type(emailInput, 'fake@fake.com');
        expect(emailInput).toHaveValue('fake@fake.com');
        userEvent.type(passwordInput, '1a');
        expect(passwordInput).toHaveValue('1a');
        userEvent.click(button);
        expect(handleFormSubmit).toBeCalledTimes(1);
        expect(handleFormSubmit).toBeCalledWith({ email: 'fake@fake.com', password: '1a' });
    });

    it('should show error message and disable a button', () => {
        render(<LoginForm handleFormSubmit={(values) => handleFormSubmit(values)} />);

        const CORRECT_EMAIL = 'fake@fake.com';
        const INCORRECT_EMAIL = 'fake@fake';
        const CORRECT_PASSWORD = '1a';
        const INCORRECT_PASSWORD = '111';
        const form = screen.getByTestId('login-form');
        const button = screen.getByRole('button', { name: /sign in/i });
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        expect(button).toBeEnabled();
        userEvent.click(button);
        expect(form).toHaveClass('shake');
        expect(screen.getByText(ErrorMessage.EmailIsRequired)).toBeInTheDocument();
        expect(screen.getByText(ErrorMessage.PasswordIsRequired)).toBeInTheDocument();
        expect(button).toBeDisabled();

        userEvent.type(emailInput, INCORRECT_EMAIL);
        expect(screen.queryByText(ErrorMessage.EmailIsRequired)).not.toBeInTheDocument();
        expect(screen.getByText(ErrorMessage.EmailInvalid)).toBeInTheDocument();
        expect(button).toBeDisabled();

        userEvent.type(passwordInput, INCORRECT_PASSWORD);
        expect(screen.queryByText(ErrorMessage.PasswordIsRequired)).not.toBeInTheDocument();
        expect(screen.getByText(ErrorMessage.PasswordInvalid)).toBeInTheDocument();
        expect(button).toBeDisabled();

        userEvent.clear(emailInput);
        userEvent.type(emailInput, CORRECT_EMAIL);
        expect(screen.queryByText(ErrorMessage.EmailInvalid)).not.toBeInTheDocument();
        expect(button).toBeDisabled();

        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, CORRECT_PASSWORD);
        expect(screen.queryByText(ErrorMessage.PasswordInvalid)).not.toBeInTheDocument();
        expect(button).toBeEnabled();
    });
});
