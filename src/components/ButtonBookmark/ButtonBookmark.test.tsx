import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { FetchStatus } from 'constants/FetchStatus';
import { hotelInitialState } from 'store/reducers/hotelReducer';
import { mockRootStoreAuthorized, mockStoreRoot } from 'test-mocks/mock-stores';
import { userInitialStateWithData } from 'test-mocks/user-mocks';

import { ButtonBookmark } from './ButtonBookmark';

describe('ButtonBookmark', () => {
    const app = (
        <Provider store={mockRootStoreAuthorized}>
            <BrowserRouter>
                <ButtonBookmark
                    width={18}
                    height={19}
                    isFavorite
                    customClassName=""
                    svgClassName=""
                    hotelId="1"
                />
            </BrowserRouter>
        </Provider>
    );

    it('should render correct style when is favorite', () => {
        render(app);

        expect(screen.getByTestId('bookmarks-svg')).toHaveStyle({
            fill: '#4481c3',
            stroke: '#4481c3',
        });
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render correct style when is not favorite', () => {
        render(
            <Provider store={mockRootStoreAuthorized}>
                <BrowserRouter>
                    <ButtonBookmark
                        width={18}
                        height={19}
                        customClassName=""
                        svgClassName=""
                        hotelId="1"
                        isFavorite={false}
                    />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getByTestId('bookmarks-svg')).not.toHaveStyle({
            fill: '#4481c3',
            stroke: '#4481c3',
        });
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should be enabled, while not posting', () => {
        render(
            <Provider store={mockRootStoreAuthorized}>
                <BrowserRouter>
                    <ButtonBookmark
                        width={18}
                        height={19}
                        isFavorite
                        customClassName=""
                        svgClassName=""
                        hotelId="1"
                    />
                </BrowserRouter>
            </Provider>,
        );
        expect(screen.getByRole('button')).toBeEnabled();
    });

    it('should be disabled while posting', () => {
        const hotelsInitialState = {
            favoritesPostFetchStatus: FetchStatus.Fetching,
        };

        const postingStore = mockStoreRoot({
            user: userInitialStateWithData,
            hotel: hotelInitialState,
            hotels: hotelsInitialState,
        });

        render(
            <Provider store={postingStore}>
                <BrowserRouter>
                    <ButtonBookmark
                        width={18}
                        height={19}
                        isFavorite
                        customClassName=""
                        svgClassName=""
                        hotelId="1"
                    />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getByRole('button')).toBeDisabled();
    });
});
