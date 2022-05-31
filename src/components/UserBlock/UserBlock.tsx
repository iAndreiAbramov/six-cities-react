import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { selectUserAvatar, selectUserEmail } from 'store/selectors/user-selectors';
import { useAppDispatch } from 'store/store';
import { requestLogoutThunkAction } from 'store/thunk-actions/login-thunk-actions';

export const UserBlock: React.FC = () => {
    const dispatch = useAppDispatch();
    const userEmail = useSelector(selectUserEmail);
    const avatarUrl = useSelector(selectUserAvatar);

    const handleLogout = () => {
        void dispatch(requestLogoutThunkAction());
    };

    return (
        <nav className="header__nav">
            <ul className="header__nav-list">
                <li className="header__nav-item user">
                    <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites()}
                    >
                        <div
                            className="header__avatar-wrapper user__avatar-wrapper"
                            style={
                                avatarUrl
                                    ? { backgroundImage: `url(${avatarUrl})`, borderRadius: '50%' }
                                    : {}
                            }
                        />
                        {userEmail && (
                            <span className="header__user-name user__name">{userEmail}</span>
                        )}
                    </Link>
                </li>
                <li className="header__nav-item">
                    {userEmail ? (
                        <span
                            className="header__nav-link"
                            style={{ cursor: 'pointer' }}
                            onClick={handleLogout}
                        >
                            <span className="header__signout">Sign out</span>
                        </span>
                    ) : (
                        <Link
                            to={AppRoute.Login()}
                            className="header__nav-link"
                            style={{ cursor: 'pointer' }}
                            onClick={handleLogout}
                        >
                            <span className="header__signout">Sign in</span>
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};
