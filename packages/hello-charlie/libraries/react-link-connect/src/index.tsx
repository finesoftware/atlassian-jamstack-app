import React from 'react';

import { getConnectAPI } from '@hello-charlie/connect-api';
import { LinkProps } from '@hello-charlie/react-link-api';

export const Link = ({ children, style, href }: LinkProps) => {
    if (href.startsWith('/')) {
        const handleClick = () => {
            const connectAPI = getConnectAPI();
            if (!connectAPI) {
                throw new Error('Connect API not available');
            }
            connectAPI.navigator.go('site', { relativeUrl: href });
        };

        return (
            <a onClick={handleClick} style={style}>
                {children}
            </a>
        );
    }

    return (
        <a href={href} target="_blank" rel="noreferrer" style={style}>
            {children}
        </a>
    );
};
