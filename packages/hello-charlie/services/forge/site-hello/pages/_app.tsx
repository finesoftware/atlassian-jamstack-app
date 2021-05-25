import React from 'react';

import type { AppProps } from 'next/app';

import '@atlaskit/css-reset';

const ConnectApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default ConnectApp;
