import React from 'react';

import { largeBannerImage } from '@hello-charlie/assets';
import { Link } from '@hello-charlie/react-link';

export const Footer = () => (
    <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Link href="https://jxl.app" style={{ cursor: 'pointer' }}>
            <img
                src={largeBannerImage}
                alt="Brought to you by JXL"
                width="100%"
                style={{ display: 'block' }}
            />
        </Link>
    </div>
);
