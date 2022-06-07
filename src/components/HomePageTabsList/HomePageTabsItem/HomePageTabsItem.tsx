import React from 'react';
import { CityName } from 'constants/Cities';

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
                data-testid="tab-item"
            >
                <span>{name}</span>
            </span>
        </li>
    );
};
