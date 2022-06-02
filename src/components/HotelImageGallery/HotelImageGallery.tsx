import React from 'react';
import ProgressiveImage from 'react-progressive-image-loading';

interface IHotelImageGalleryProps {
    images: string[];
}

export const HotelImageGallery: React.FC<IHotelImageGalleryProps> = ({ images }) => {
    return (
        <div className="property__gallery-container container">
            <div className="property__gallery">
                {images?.map((image) => (
                    <div className="property__image-wrapper" key={image}>
                        <ProgressiveImage
                            preview="img/stub.jpg"
                            src={image}
                            render={(src) => (
                                <img className="property__image" src={src} alt="Offer view" />
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
