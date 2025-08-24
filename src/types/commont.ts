import type { ComponentType } from 'react';

export type ProviderWithProps = [ComponentType<any>, Record<string, any>?];
