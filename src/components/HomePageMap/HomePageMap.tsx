import React, { useEffect, useRef } from 'react';
import { useMap } from 'hooks/useMap';
import { Marker } from 'leaflet';
import { ICityLocation, IPoint } from 'types/map-types';

import { ACTIVE_CUSTOM_ICON, DEFAULT_CUSTOM_ICON } from './HomePageMap.constants';

interface IHomePageProps {
    pointsForMap: IPoint[];
    cityLocation: ICityLocation;
    activeHotelId: number | null;
}

export const HomePageMap: React.FC<IHomePageProps> = ({
    pointsForMap,
    cityLocation,
    activeHotelId,
}) => {
    const mapRef = useRef(null);
    const map = useMap(mapRef, cityLocation);
    const markers: Marker[] = [];

    useEffect(() => {
        if (map) {
            pointsForMap.forEach((point) => {
                const marker = new Marker({
                    lat: point.latitude,
                    lng: point.longitude,
                });

                marker
                    .setIcon(
                        activeHotelId && activeHotelId === point.id
                            ? ACTIVE_CUSTOM_ICON
                            : DEFAULT_CUSTOM_ICON,
                    )
                    .addTo(map);
                markers.push(marker);
            });
            return () => markers.forEach((marker) => marker.removeFrom(map));
        }
    });

    return (
        <div className="cities__right-section">
            <section className="cities__map map" ref={mapRef} />
        </div>
    );
};
