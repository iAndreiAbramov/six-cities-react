import { MAX_IMAGES_IN_GALLERY } from 'constants/common';

import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectHotelData } from 'store/selectors/hotel-selectors';
import { useAppDispatch } from 'store/store';
import {
    requestCommentsThunkAction,
    requestHotelThunkAction,
} from 'store/thunk-actions/hotel-thunk-actions';

import { HotelAttributes } from 'components/HotelAttributes';
import { HotelImageGallery } from 'components/HotelImageGallery';
import { HotelNearPlaces } from 'components/HotelNearPlaces';
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
    } = useSelector(selectHotelData);

    const offerImages = useMemo(() => {
        if (images?.length === 0) {
            return [];
        }
        if (images?.length > MAX_IMAGES_IN_GALLERY) {
            return images.slice(0, MAX_IMAGES_IN_GALLERY);
        }

        return images;
    }, [images]);

    useEffect(() => {
        if (id) {
            void dispatch(requestHotelThunkAction(id));
            void dispatch(requestCommentsThunkAction(id));
        }
    }, [dispatch, id]);

    return (
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
                        />
                        <section className="property__map map" />
                    </section>
                    <div className="container">
                        <HotelNearPlaces />
                    </div>
                </main>
            </div>
        </>
    );
};
