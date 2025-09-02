declare module 'react-activity' {
    import type * as React from 'react';

    interface SpinnerProps {
        size?: number;
        color?: string;
        animating?: boolean;
        [key: string]: any;
    }

    export const Spinner: React.ComponentType<SpinnerProps>;
}
