import type { ReactNode } from 'react';
import { ProviderWithProps } from 'types/commont';

const buildProvidersTree = (componentsWithProps: ProviderWithProps[]) => {
    const initialComponent: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

    return componentsWithProps.reduce(
        (ComponentProvider, [Provider, props = {}]) =>
            ({ children }: { children: ReactNode }) => (
                <ComponentProvider>
                    <Provider {...props}>{children}</Provider>
                </ComponentProvider>
            ),
        initialComponent
    );
};

export { buildProvidersTree };
