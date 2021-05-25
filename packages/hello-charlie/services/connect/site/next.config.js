/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

const withImages = require('next-images');

module.exports = withImages({
    webpack: (config) => {
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

        // use *connect* implementations of library stubs
        config.resolve.alias['@hello-charlie/jira-request'] = '@hello-charlie/jira-request-connect';
        config.resolve.alias['@hello-charlie/react-link'] = '@hello-charlie/react-link-connect';

        return config;
    },
});
