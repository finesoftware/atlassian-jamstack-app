/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

const withImages = require('next-images');

module.exports = withImages({
    assetPrefix: '.',
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    '@babel/preset-typescript',
                    '@babel/preset-react',
                ],
            },
        });

        config.resolve.extensions.push('.ts', '.tsx');

        config.resolve.mainFields = ['browser', 'module', 'main'];

        // use *forge* implementation of library stubs
        if (!options.isServer) {
            config.resolve.alias['@hello-charlie/jira-request'] =
                '@hello-charlie/jira-request-forge';
            config.resolve.alias['@hello-charlie/react-link'] = '@hello-charlie/react-link-forge';
        }

        return config;
    },
});
