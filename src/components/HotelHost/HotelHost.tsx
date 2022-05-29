import React from 'react';
import { IHotelHostFront } from 'types/hotel.types';

interface IHotelHostProps {
    host: IHotelHostFront;
    description: string;
}

export const HotelHost: React.FC<IHotelHostProps> = ({ host, description }) => {
    return (
        <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
                <div
                    className={`property__avatar-wrapper user__avatar-wrapper ${
                        host?.isPro ? 'property__avatar-wrapper--pro' : ''
                    }`}
                >
                    <img
                        className="property__avatar user__avatar"
                        src={host?.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                    />
                </div>
                <span className="property__user-name">{host?.name}</span>
                {host?.isPro && <span className="property__user-status">Pro</span>}
            </div>
            <div className="property__description">
                <p className="property__text">{description}</p>
            </div>
        </div>
    );
};
