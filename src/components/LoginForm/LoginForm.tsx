import { AppRoute } from 'constants/AppRoute';

import React from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/store';
import { requestLoginThunkAction } from 'store/thunk-actions/login-thunk-actions';
import { IUserAuthRequest } from 'types/user-auth.types';

import { validateLoginForm } from './LoginForm.utils';

export const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = (values: IUserAuthRequest) => {
        dispatch(requestLoginThunkAction(values))
            .then(() => navigate(AppRoute.Home()))
            .catch((error) => {
                throw error;
            });
    };

    return (
        <Form onSubmit={handleFormSubmit} validate={validateLoginForm}>
            {({ handleSubmit, submitFailed, errors }) => (
                <section className="login">
                    <h1 className="login__title">Sign in</h1>
                    <form className="login__form form" onSubmit={handleSubmit}>
                        <Field name="email">
                            {({ input, meta }) => (
                                <div className="login__input-wrapper form__input-wrapper">
                                    <label className="visually-hidden">E-mail</label>
                                    <input
                                        {...input}
                                        className="login__input form__input"
                                        placeholder="Email"
                                        style={
                                            meta.invalid && submitFailed
                                                ? { borderColor: 'darkred' }
                                                : {}
                                        }
                                    />
                                </div>
                            )}
                        </Field>
                        <Field name="password">
                            {({ input, meta }) => (
                                <div className="login__input-wrapper form__input-wrapper">
                                    <label className="visually-hidden">Password</label>
                                    <input
                                        {...input}
                                        className="login__input form__input"
                                        type="password"
                                        placeholder="Password"
                                        style={
                                            meta.invalid && submitFailed
                                                ? { borderColor: 'darkred' }
                                                : {}
                                        }
                                    />
                                </div>
                            )}
                        </Field>
                        <button className="login__submit form__submit button" type="submit">
                            Sign in
                        </button>
                        <div
                            style={{
                                color: 'darkred',
                                fontSize: '12px',
                                marginTop: '12px',
                            }}
                        >
                            {submitFailed && errors?.email}
                        </div>
                        <div
                            style={{
                                color: 'darkred',
                                fontSize: '12px',
                                marginTop: '12px',
                            }}
                        >
                            {submitFailed && errors?.password}
                        </div>
                    </form>
                </section>
            )}
        </Form>
    );
};
