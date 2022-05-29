export interface IHotelBack {
    bedrooms: number;
    city: {
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
        name: string;
    };
    description: string;
    goods: string[];
    host: {
        avatar_url: string;
        id: number;
        is_pro: boolean;
        name: string;
    };
    id: number;
    images: string[];
    is_favorite: boolean;
    is_premium: boolean;
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    max_adults: number;
    preview_image: string;
    price: number;
    rating: number;
    title: string;
    type: string;
}

export interface IHotelFront {
    bedrooms: number;
    city: {
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
        name: string;
    };
    description: string;
    goods: string[];
    host: {
        avatarUrl: string;
        id: number;
        isPro: boolean;
        name: string;
    };
    id: number;
    images: string[];
    isFavorite: boolean;
    isPremium: boolean;
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    maxAdults: number;
    previewImage: string;
    price: number;
    rating: number;
    title: string;
    type: string;
}
