import { Icon } from 'leaflet';

export enum MapMarker {
    Default = './img/pin.svg',
    Active = './img/pin-active.svg',
}

export const DEFAULT_CUSTOM_ICON = new Icon({
    iconUrl: MapMarker.Default,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

export const ACTIVE_CUSTOM_ICON = new Icon({
    iconUrl: MapMarker.Active,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});
