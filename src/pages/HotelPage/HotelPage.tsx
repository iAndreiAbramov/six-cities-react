import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MAX_IMAGES_IN_GALLERY } from 'constants/common';
import { FetchStatus } from 'constants/FetchStatus';
import {
    selectCommentsFetchStatus,
    selectHotelData,
    selectHotelFetchStatus,
    selectNearby,
    selectNearbyFetchStatus,
} from 'store/selectors/hotel-selectors';
import { useAppDispatch } from 'store/store';
import {
    requestCommentsThunkAction,
    requestHotelThunkAction,
    requestNearbyThunkAction,
} from 'store/thunk-actions/hotel-thunk-actions';

import { HotelHost } from 'components/HotelHost';
import { HotelImageGallery } from 'components/HotelImageGallery';
import { HotelNearPlaces } from 'components/HotelNearPlaces';
import { HotelReviews } from 'components/HotelReviews';
import { LoaderDelayed } from 'components/LoaderDelayed';
import { Map } from 'components/Map';
import { PageHeader } from 'components/PageHeader';
import { SvgInject } from 'components/SvgInject';

export const HotelPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams() as { id: string };
    const {
        images,
        isPremium,
        title,
        rating,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        host,
        description,
        city,
    } = useSelector(selectHotelData);
    const nearPlaces = useSelector(selectNearby);
    const hotelFetchStatus = useSelector(selectHotelFetchStatus);
    const commentsFetchStatus = useSelector(selectCommentsFetchStatus);
    const nearbyFetchStatus = useSelector(selectNearbyFetchStatus);
    const [activeHotelId, setActiveHotelId] = useState<number | null>(null);
    const [isFetchingComplete, setIsFetchingComplete] = useState(false);

    const isHotelFetching = useMemo(
        () => hotelFetchStatus === FetchStatus.Fetching,
        [hotelFetchStatus],
    );
    const areCommentsFetching = useMemo(
        () => commentsFetchStatus === FetchStatus.Fetching,
        [commentsFetchStatus],
    );
    const areNearbyFetching = useMemo(
        () => nearbyFetchStatus === FetchStatus.Fetching,
        [nearbyFetchStatus],
    );

    const handleActiveHotelIdChange = useCallback((hotelId: number) => {
        setActiveHotelId(hotelId);
    }, []);

    const offerImages = useMemo(() => {
        if (images?.length === 0) {
            return [];
        }
        if (images?.length > MAX_IMAGES_IN_GALLERY) {
            return images.slice(0, MAX_IMAGES_IN_GALLERY);
        }

        return images;
    }, [images]);

    const pointsForMap = useMemo(() => {
        return nearPlaces.map(({ id, location }) => {
            return { id, latitude: location.latitude, longitude: location.longitude };
        });
    }, [nearPlaces]);

    const cityLocation = useMemo(() => {
        return {
            latitude: city?.location?.latitude,
            longitude: city?.location?.longitude,
            zoom: city?.location?.zoom,
        };
    }, [city]);

    useEffect(() => {
        if (id) {
            void dispatch(requestHotelThunkAction(id));
            void dispatch(requestCommentsThunkAction(id));
            void dispatch(requestNearbyThunkAction(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {isFetchingComplete ? (
                <>
                    <SvgInject />
                    <div className="page">
                        <PageHeader isWithUser />
                        <main className="page__main page__main--property">
                            <section className="property">
                                <HotelImageGallery images={offerImages} />
                                <div className="property__container container">
                                    <div className="property__wrapper">
                                        {isPremium && (
                                            <div className="property__mark">
                                                <span>Premium</span>
                                            </div>
                                        )}
                                        <div className="property__name-wrapper">
                                            <h1 className="property__name">{title}</h1>
                                            <button
                                                className="property__bookmark-button button"
                                                type="button"
                                            >
                                                <svg
                                                    className="property__bookmark-icon"
                                                    width="31"
                                                    height="33"
                                                >
                                                    <use xlinkHref="#icon-bookmark" />
                                                </svg>
                                                <span className="visually-hidden">
                                                    To bookmarks
                                                </span>
                                            </button>
                                        </div>
                                        <div className="property__rating rating">
                                            <div className="property__stars rating__stars">
                                                <span
                                                    style={{ width: `${Math.round(rating) * 20}%` }}
                                                />
                                                <span className="visually-hidden">Rating</span>
                                            </div>
                                            <span className="property__rating-value rating__value">
                                                {rating}
                                            </span>
                                        </div>
                                        <ul className="property__features">
                                            <li className="property__feature property__feature--entire">
                                                {type}
                                            </li>
                                            <li className="property__feature property__feature--bedrooms">
                                                {`${bedrooms} Bedrooms`}
                                            </li>
                                            <li className="property__feature property__feature--adults">
                                                {`Max ${maxAdults} adults`}
                                            </li>
                                        </ul>
                                        <div className="property__price">
                                            <b className="property__price-value">&euro;{price}</b>
                                            <span className="property__price-text">
                                                &nbsp;night
                                            </span>
                                        </div>
                                        <div className="property__inside">
                                            <h2 className="property__inside-title">
                                                What&apos;s inside
                                            </h2>
                                            <ul className="property__inside-list">
                                                {goods?.map((good) => (
                                                    <li
                                                        className="property__inside-item"
                                                        key={good}
                                                    >
                                                        {good}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <HotelHost host={host} description={description} />
                                        <HotelReviews id={id} />
                                    </div>
                                </div>
                                <Map
                                    pointsForMap={pointsForMap}
                                    cityLocation={cityLocation}
                                    activeHotelId={activeHotelId}
                                />
                            </section>
                            <div className="container">
                                <HotelNearPlaces
                                    nearPlaces={nearPlaces}
                                    handleActiveHotelIdChange={handleActiveHotelIdChange}
                                />
                            </div>
                        </main>
                    </div>
                </>
            ) : (
                <LoaderDelayed
                    dependencies={[isHotelFetching, areCommentsFetching, areNearbyFetching]}
                    handleContentIsReady={setIsFetchingComplete}
                />
            )}
        </>
    );
};
