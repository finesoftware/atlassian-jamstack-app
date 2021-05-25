import React from 'react';

import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class ConnectDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <script
                        src="https://connect-cdn.atl-paas.net/all.js"
                        data-options="sizeToParent:true"
                    />

                    <style>{'#__next { height: 100% }'}</style>
                </Head>
                <body id="content" className="ac-content">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
