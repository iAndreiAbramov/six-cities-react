import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMap } from 'hooks/useMap';
import { Marker } from 'leaflet';
import { ICityLocation, IPoint } from 'types/map-types';

import { ACTIVE_CUSTOM_ICON, DEFAULT_CUSTOM_ICON } from './Map.constants';

interface IHomePageMapProps {
    pointsForMap: IPoint[];
    cityLocation: ICityLocation;
    activeHotelId: number | null;
}

export const Map: React.FC<IHomePageMapProps> = ({ pointsForMap, cityLocation, activeHotelId }) => {
    const mapRef = useRef(null);
    const map = useMap(mapRef, cityLocation);
    const markers: Marker[] = [];
    const { pathname } = useLocation();

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
        <section
            className={`map ${pathname === '/' ? 'cities__map' : 'property__map'} `}
            ref={mapRef}
        />
    );
};
