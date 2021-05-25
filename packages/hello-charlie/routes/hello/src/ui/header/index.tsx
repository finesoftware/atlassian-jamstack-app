import React from 'react';

import Button from '@atlaskit/button/standard-button';
import { Link } from '@hello-charlie/react-link';

type Props = {
    onFetchProjects?: () => void;
};

export const Header = ({ onFetchProjects }: Props) => (
    <div>
        <h1>Hello Charlie! 👋</h1>

        <p>
            A{' '}
            <Link href="https://jamstack.org" style={{ cursor: 'pointer' }}>
                Jamstack
            </Link>
            -based sample app for Jira Cloud, based on{' '}
            <Link href="https://nextjs.org" style={{ cursor: 'pointer' }}>
                next.js
            </Link>
            . Compatible with{' '}
            <Link
                href="https://developer.atlassian.com/cloud/jira/platform/getting-started-with-connect/"
                style={{ cursor: 'pointer' }}
            >
                Atlassian Connect
            </Link>{' '}
            and{' '}
            <Link
                href="https://developer.atlassian.com/cloud/jira/platform/getting-started-with-forge/"
                style={{ cursor: 'pointer' }}
            >
                Atlassian Forge
            </Link>
            .
        </p>
        <p>Click the button below to invoke Jira's REST API.</p>
        <p>
            <Button appearance="primary" onClick={onFetchProjects} css={undefined}>
                Retrieve recent projects
            </Button>
        </p>
    </div>
);
