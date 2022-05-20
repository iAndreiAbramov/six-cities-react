import { SortOption } from 'constants/SortOptions';

import React, { useCallback, useMemo, useState } from 'react';

interface IHomePageSortDropdownProps {
    options: SortOption[];
    currentSort: string | null;
}

export const HomePageSortDropdown: React.FC<IHomePageSortDropdownProps> = ({
    options,
    currentSort,
}) => {
    const [isDropDownActive, setIsDropDownActive] = useState(false);

    const handleDropDownToggle = useCallback(() => {
        setIsDropDownActive((current) => !current);
    }, []);

    const sortOption = useMemo(() => currentSort || SortOption.Popular, [currentSort]);

    return (
        <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption" style={{ userSelect: 'none' }}>
                Sort by
            </span>
            <span
                className="places__sorting-type"
                tabIndex={0}
                onClick={handleDropDownToggle}
                style={{ userSelect: 'none' }}
            >
                {sortOption}
                <svg
                    className="places__sorting-arrow"
                    width="7"
                    height="4"
                    style={
                        isDropDownActive
                            ? {
                                  transform: 'rotate(180deg) translateY(50%)',
                              }
                            : {}
                    }
                >
                    <use xlinkHref="#icon-arrow-select" />
                </svg>
            </span>
            {isDropDownActive && (
                <ul className="places__options places__options--custom places__options--opened">
                    {options.map((option) => (
                        <li
                            className="places__option places__option--active"
                            tabIndex={0}
                            key={option}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};
