import React from 'react';

import { router } from '@forge/bridge';
import { LinkProps } from '@hello-charlie/react-link-api';

export const Link = ({ children, style, href }: LinkProps) => {
    const handleClick = () => {
        if (href.startsWith('/')) {
            router.navigate(href);
        } else {
            router.open(href);
        }
    };

    return (
        <a style={style} onClick={handleClick}>
            {children}
        </a>
    );
};
