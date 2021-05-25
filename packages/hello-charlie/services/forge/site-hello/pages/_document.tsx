import React from 'react';

import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class ForgeDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta
                        httpEquiv="Content-Security-Policy"
                        content="style-src 'unsafe-inline' 'self'"
                    />

                    <style>{'#__next { height: 100% }'}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
