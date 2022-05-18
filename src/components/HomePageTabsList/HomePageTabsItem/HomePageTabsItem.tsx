import React from 'react';
import { TabQueryName, TabScreenName } from 'types/tabs.types';

interface ITabItem {
    name: TabScreenName;
    queryName: TabQueryName;
    isActive?: boolean;
    handleClick: (queryName: TabQueryName) => void;
}

export const HomePageTabsItem: React.FC<ITabItem> = ({
    name,
    isActive,
    handleClick,
    queryName,
}) => {
    return (
        <li className="locations__item">
            <span
                className={`locations__item-link tabs__item ${
                    isActive ? 'tabs__item--active' : ''
                }`}
                onClick={() => handleClick(queryName)}
                style={{ cursor: 'pointer' }}
            >
                <span>{name}</span>
            </span>
        </li>
    );
};
