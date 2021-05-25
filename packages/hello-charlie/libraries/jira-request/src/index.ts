import { Request } from '@hello-charlie/jira-request-api';

export const request: Request = <TResult extends unknown>() =>
    new Promise<TResult>((_, reject) => {
        reject(new Error('Not implemented'));
    });
