import React, { useEffect, useState } from 'react';
import { ReactComponent as Loader } from 'svg/loader.svg';

import { ILoaderDelayedProps } from './LoaderDelayed.types';

import './LoaderDelayed.scss';

export const LoaderDelayed: React.FC<ILoaderDelayedProps> = ({
    delay = 1000,
    dependencies,
    handleContentIsReady,
}) => {
    const [isTimeElapsed, setIsTimeElapsed] = useState(false);

    useEffect(() => {
        setIsTimeElapsed(false);
        setTimeout(() => setIsTimeElapsed(true), delay);
    }, [delay]);

    useEffect(() => {
        if (isTimeElapsed && dependencies.every((dep) => !dep)) {
            handleContentIsReady(true);
        }
    }, [isTimeElapsed, dependencies, handleContentIsReady]);

    return (
        <div className="loaderWrapper">
            <Loader />
        </div>
    );
};
