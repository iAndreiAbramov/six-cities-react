import React from 'react';

interface IHotelImageGalleryProps {
    images: string[];
}

export const HotelImageGallery: React.FC<IHotelImageGalleryProps> = ({ images }) => {
    return (
        <div className="property__gallery-container container">
            <div className="property__gallery">
                {images?.map((image) => (
                    <div className="property__image-wrapper" key={image}>
                        <img className="property__image" src={image} alt="Offer view" />
                    </div>
                ))}
            </div>
        </div>
    );
};
