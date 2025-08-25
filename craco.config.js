const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            if (!webpackConfig.resolve) webpackConfig.resolve = {};
            if (!webpackConfig.resolve.plugins) webpackConfig.resolve.plugins = [];
            webpackConfig.resolve.plugins.push(
                new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
            );
            return webpackConfig;
        },
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    jest: {
        configure: (jestConfig) => {
            jestConfig.moduleNameMapper = {
                ...(jestConfig.moduleNameMapper || {}),
                '^@/(.*)$': '<rootDir>/src/$1',
            };
            return jestConfig;
        },
    },

};

