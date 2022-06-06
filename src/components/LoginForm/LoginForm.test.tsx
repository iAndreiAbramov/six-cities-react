import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './LoginForm';

describe('Component', () => {
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
});
