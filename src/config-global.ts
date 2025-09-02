import { paths } from './routes/paths';
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
  appName: import.meta.env.VITE_APP_NAME || 'Kemnhanonline',
  appVersion: import.meta.env.VITE_APP_VERSION || packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL || '',
  imageUrl: import.meta.env.VITE_IMAGE_URL || '',
  domain: import.meta.env.VITE_APP_DOMAIN || '',
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  nodeEnv: import.meta.env.DEV ? 'development' : 'production',
};
