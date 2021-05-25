import React, { useState } from 'react';

import { request } from '@hello-charlie/jira-request';

import { Project } from './types';
import { Error } from './ui/error';
import { Footer } from './ui/footer';
import { Header } from './ui/header';
import { RecentProjects } from './ui/recent-projects';

export const HelloRoute = () => {
    const [recentProjects, setRecentProjects] = useState<{
        loading: boolean;
        data?: Project[];
        error?: unknown;
    }>({ loading: false });

    const handleFetchProjects = async () => {
        setRecentProjects({ loading: true });

        try {
            const data = await request<Project[]>('/rest/api/3/project?recent=10');
            setRecentProjects({ loading: false, data });
        } catch (error) {
            setRecentProjects({ loading: false, error });
        }
    };

    return (
        <div
            style={{
                boxSizing: 'border-box',
                height: '100%',
                padding: 32,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
            }}
        >
            <div style={{ width: 838, maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
                <Header onFetchProjects={handleFetchProjects} />
                <div style={{ flex: '1 1 auto', overflow: 'scroll', marginTop: 24 }}>
                    {recentProjects.loading ? <p>Loading...</p> : null}
                    {recentProjects.data ? <RecentProjects projects={recentProjects.data} /> : null}
                    {recentProjects.error ? <Error error={recentProjects.error} /> : null}
                </div>
                <Footer />
            </div>
        </div>
    );
};
