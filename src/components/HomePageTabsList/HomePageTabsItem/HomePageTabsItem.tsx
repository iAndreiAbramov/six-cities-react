import { CityName } from 'constants/Cities';

import React from 'react';

interface ITabItem {
    name: CityName;
    isActive?: boolean;
    handleClick: (queryName: CityName) => void;
}

export const HomePageTabsItem: React.FC<ITabItem> = ({ name, isActive, handleClick }) => {
    return (
        <li className="locations__item">
            <span
                className={`locations__item-link tabs__item ${
                    isActive ? 'tabs__item--active' : ''
                }`}
                onClick={() => handleClick(name)}
                style={{ cursor: 'pointer' }}
            >
                <span>{name}</span>
            </span>
        </li>
    );
};
