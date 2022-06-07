import React from 'react';
import { render, screen } from '@testing-library/react';

import { LoaderDelayed } from './LoaderDelayed';

describe('LoaderDelayed', () => {
    const handleContentIsReady = jest.fn();
    it('should render passed data correctly', () => {
        render(
            <LoaderDelayed
                dependencies={[true, false]}
                handleContentIsReady={handleContentIsReady}
            />,
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
        expect(handleContentIsReady).toBeCalledTimes(0);
    });
});
