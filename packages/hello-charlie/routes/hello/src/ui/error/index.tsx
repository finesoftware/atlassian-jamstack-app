import React from 'react';

type Props = {
    error: unknown;
};

export const Error = ({ error }: Props) => (
    <p style={{ color: '#FF5630' }}>
        Something went wrong: {(error as { message?: string }).message ?? 'Unknown error'}
    </p>
);
