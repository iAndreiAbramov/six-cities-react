import React, { useCallback, useState } from 'react';
import { useCloseByClick } from 'hooks/useCloseByClick';
import { useCloseByEsc } from 'hooks/useCloseByEsc';
import { useSortDisplayName } from 'hooks/useSortDisplayName';
import { ISortOption, SortOption, SortOptionQuery } from 'types/sort-options.types';

interface IHomePageSortDropdownProps {
    options: ISortOption[];
    currentSort: string | null;
    handleSortChange: (value: SortOptionQuery) => void;
}

export const HomePageSortDropdown: React.FC<IHomePageSortDropdownProps> = ({
    options,
    currentSort,
    handleSortChange,
}) => {
    const [isDropDownActive, setIsDropDownActive] = useState(false);
    const currentSortDisplayName = useSortDisplayName(currentSort);

    useCloseByClick({ isShown: isDropDownActive, cb: () => setIsDropDownActive(false) });
    useCloseByEsc({ isShown: isDropDownActive, cb: () => setIsDropDownActive(false) });

    const handleDropDownToggle = useCallback(() => {
        setIsDropDownActive((current) => !current);
    }, []);

    return (
        <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption" style={{ userSelect: 'none' }}>
                Sort by
            </span>
            <span
                className="places__sorting-type"
                tabIndex={0}
                style={{ userSelect: 'none' }}
                onClick={handleDropDownToggle}
                data-testid="dropdown-toggle"
            >
                {currentSortDisplayName || SortOption.Popular}
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
                    {options.map(({ displayName, queryName }) => (
                        <li
                            className="places__option places__option--active"
                            tabIndex={0}
                            key={queryName}
                            onClick={() => handleSortChange(queryName)}
                        >
                            {displayName}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};
