import { useEffect } from 'react';

export const useCloseByClick = ({ isShown, cb }: { isShown: boolean; cb: () => void }): void => {
    useEffect(() => {
        const closeByClick = () => {
            cb();
        };

        if (isShown) {
            document.addEventListener('click', closeByClick);
        }

        return () => {
            document.removeEventListener('click', closeByClick);
        };
    }, [cb, isShown]);
};
