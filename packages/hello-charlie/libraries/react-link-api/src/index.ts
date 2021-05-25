import { ReactNode, CSSProperties } from 'react';

export type LinkProps = {
    children: ReactNode;
    style?: CSSProperties | undefined;
    href: string;
};
