import { MutableRefObject, useEffect, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { ICityLocation } from 'types/map-types';

export const useMap = (
    mapRef: MutableRefObject<HTMLElement | null>,
    cityLocation: ICityLocation,
): Map | null => {
    const [map, setMap] = useState<Map | null>(null);
    const { latitude, longitude, zoom } = cityLocation;

    useEffect(() => {
        if (map !== null && latitude && longitude && zoom) {
            map.flyTo([latitude, longitude], zoom);
        }
        if (mapRef.current !== null && map === null && latitude && longitude && zoom) {
            const instance = new Map(mapRef.current, {
                center: [latitude, longitude],
                zoom: zoom,
                scrollWheelZoom: false,
            });
            const layer = new TileLayer(
                'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a' +
                        ' href="https://carto.com/attributions">CARTO</a>',
                },
            );

            instance.addLayer(layer);
            setMap(instance);
        }
    }, [mapRef, map, latitude, longitude, zoom]);

    return map;
};
