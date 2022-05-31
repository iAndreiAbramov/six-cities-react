import { Dispatch, SetStateAction } from 'react';

export interface ILoaderDelayedProps {
    delay?: number;
    dependencies: boolean[];
    handleContentIsReady: Dispatch<SetStateAction<boolean>>;
}
