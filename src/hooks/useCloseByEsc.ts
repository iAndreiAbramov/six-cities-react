import { useEffect } from 'react';

export const useCloseByEsc = ({ isShown, cb }: { isShown: boolean; cb: () => void }): void => {
    useEffect(() => {
        const closePopupByEsc = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                cb();
            }
        };

        if (isShown) {
            document.addEventListener('keydown', closePopupByEsc);
        }

        return () => {
            document.removeEventListener('keydown', closePopupByEsc);
        };
    }, [cb, isShown]);
};
