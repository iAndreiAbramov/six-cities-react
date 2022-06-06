import { IHotelBack, IHotelFront } from 'types/hotel.types';

export const MOCK_HOTEL_FIRST_BACK: IHotelBack = {
    bedrooms: 3,
    city: {
        location: {
            latitude: 300,
            longitude: 300,
            zoom: 10,
        },
        name: 'Amsterdam',
    },
    description: 'nice place',
    goods: ['1', '2', '3'],
    host: {
        ['avatar_url']: 'avatar/url',
        id: 1,
        ['is_pro']: true,
        name: 'Alex',
    },
    id: 1,
    images: ['1', '2', '3'],
    ['is_favorite']: true,
    ['is_premium']: true,
    location: {
        latitude: 300,
        longitude: 300,
        zoom: 10,
    },
    ['max_adults']: 3,
    ['preview_image']: 'preview/img',
    price: 100,
    rating: 1,
    title: 'title',
    type: 'type',
};

export const MOCK_HOTEL_FIRST_FRONT: IHotelFront = {
    bedrooms: 3,
    city: {
        location: {
            latitude: 300,
            longitude: 300,
            zoom: 10,
        },
        name: 'Amsterdam',
    },
    description: 'nice place',
    goods: ['1', '2', '3'],
    host: {
        avatarUrl: 'avatar/url',
        id: 1,
        isPro: true,
        name: 'Alex',
    },
    id: 1,
    images: ['1', '2', '3'],
    isFavorite: true,
    isPremium: true,
    location: {
        latitude: 300,
        longitude: 300,
        zoom: 10,
    },
    maxAdults: 3,
    previewImage: 'preview/img',
    price: 100,
    rating: 1,
    title: 'title',
    type: 'type',
};

export const MOCK_HOTEL_SECOND_BACK: IHotelBack = {
    bedrooms: 3,
    city: {
        location: {
            latitude: 300,
            longitude: 300,
            zoom: 10,
        },
        name: 'Paris',
    },
    description: 'nice place',
    goods: ['1', '2', '3'],
    host: {
        ['avatar_url']: 'avatar/url',
        id: 1,
        ['is_pro']: true,
        name: 'Alex',
    },
    id: 2,
    images: ['1', '2', '3'],
    ['is_favorite']: false,
    ['is_premium']: true,
    location: {
        latitude: 300,
        longitude: 300,
        zoom: 10,
    },
    ['max_adults']: 3,
    ['preview_image']: 'preview/img',
    price: 200,
    rating: 2,
    title: 'title',
    type: 'type',
};

export const MOCK_HOTEL_SECOND_FRONT: IHotelFront = {
    bedrooms: 3,
    city: {
        location: {
            latitude: 300,
            longitude: 300,
            zoom: 10,
        },
        name: 'Paris',
    },
    description: 'nice place',
    goods: ['1', '2', '3'],
    host: {
        avatarUrl: 'avatar/url',
        id: 1,
        isPro: true,
        name: 'Alex',
    },
    id: 2,
    images: ['1', '2', '3'],
    isFavorite: false,
    isPremium: true,
    location: {
        latitude: 300,
        longitude: 300,
        zoom: 10,
    },
    maxAdults: 3,
    previewImage: 'preview/img',
    price: 200,
    rating: 2,
    title: 'title',
    type: 'type',
};

export const MOCK_HOTEL_THIRD_BACK: IHotelBack = {
    bedrooms: 3,
    city: {
        location: {
            latitude: 300,
            longitude: 300,
            zoom: 10,
        },
        name: 'Amsterdam',
    },
    description: 'nice place',
    goods: ['1', '2', '3'],
    host: {
        ['avatar_url']: 'avatar/url',
        id: 1,
        ['is_pro']: true,
        name: 'Alex',
    },
    id: 3,
    images: ['1', '2', '3'],
    ['is_favorite']: true,
    ['is_premium']: true,
    location: {
        latitude: 300,
        longitude: 300,
        zoom: 10,
    },
    ['max_adults']: 3,
    ['preview_image']: 'preview/img',
    price: 300,
    rating: 3,
    title: 'title',
    type: 'type',
};

export const MOCK_HOTEL_THIRD_FRONT: IHotelFront = {
    bedrooms: 3,
    city: {
        location: {
            latitude: 300,
            longitude: 300,
            zoom: 10,
        },
        name: 'Amsterdam',
    },
    description: 'nice place',
    goods: ['1', '2', '3'],
    host: {
        avatarUrl: 'avatar/url',
        id: 1,
        isPro: true,
        name: 'Alex',
    },
    id: 3,
    images: ['1', '2', '3'],
    isFavorite: true,
    isPremium: true,
    location: {
        latitude: 300,
        longitude: 300,
        zoom: 10,
    },
    maxAdults: 3,
    previewImage: 'preview/img',
    price: 300,
    rating: 3,
    title: 'title',
    type: 'type',
};

export const MOCK_HOTELS_BACK: IHotelBack[] = [
    MOCK_HOTEL_FIRST_BACK,
    MOCK_HOTEL_SECOND_BACK,
    MOCK_HOTEL_THIRD_BACK,
];

export const MOCK_HOTELS_FRONT: IHotelFront[] = [
    MOCK_HOTEL_FIRST_FRONT,
    MOCK_HOTEL_SECOND_FRONT,
    MOCK_HOTEL_THIRD_FRONT,
];
