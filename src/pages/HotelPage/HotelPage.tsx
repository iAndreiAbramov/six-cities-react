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

import { HotelAttributes } from 'components/HotelAttributes';
import { HotelImageGallery } from 'components/HotelImageGallery';
import { HotelNearPlaces } from 'components/HotelNearPlaces';
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
                                <HotelAttributes
                                    isPremium={isPremium}
                                    title={title}
                                    rating={rating}
                                    type={type}
                                    bedrooms={bedrooms}
                                    maxAdults={maxAdults}
                                    goods={goods}
                                    price={price}
                                    host={host}
                                    description={description}
                                    id={id}
                                />
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
