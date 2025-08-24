import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
    appName: string;
    appVersion: string;
    serverUrl: string;
    imageUrl: string;
    domain: string;
    auth: {
        method: 'jwt';
        skip: boolean;
        redirectPath: string;
    };
    nodeEnv: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
    appName: process.env.REACT_APP_APP_NAME || 'kemnhanonline',
    appVersion: process.env.REACT_APP_APP_VERSION || packageJson.version,
    serverUrl: process.env.REACT_APP_SERVER_URL || '',
    imageUrl: process.env.REACT_APP_IMAGE_URL || '',
    domain: process.env.REACT_APP_DOMAIN || '',
    auth: {
        method: 'jwt',
        skip: false,
        redirectPath: '/admin',
    },
    nodeEnv: process.env.NODE_ENV === 'development' ? 'development' : 'production',
};
