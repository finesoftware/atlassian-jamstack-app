import React from 'react';

import { Link } from '@hello-charlie/react-link';

import { Project } from '../../types';

type Props = {
    projects: Project[];
};

export const RecentProjects = ({ projects }: Props) => {
    if (projects.length === 0) {
        return <>No recent projects.</>;
    }

    return (
        <div>
            {projects.map((project) => (
                <Link
                    href={`/browse/${project.key}`}
                    key={project.id}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 8,
                            border: '1px solid #DFE1E6',
                            marginBottom: 2,
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src={project.avatarUrls['48x48']}
                            alt={project.name}
                            width={24}
                            height={24}
                            style={{ marginRight: 8 }}
                        />
                        {project.name} ({project.key})
                    </div>
                </Link>
            ))}
        </div>
    );
};
