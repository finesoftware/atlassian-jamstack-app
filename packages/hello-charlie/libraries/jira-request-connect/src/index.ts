import { getConnectAPI } from '@hello-charlie/connect-api';
import { Options, Request } from '@hello-charlie/jira-request-api';

export const request: Request = <TResult extends unknown>(url: string, options: Options = {}) => {
    return new Promise<TResult>((resolve, reject) => {
        const connectAPI = getConnectAPI();

        if (!connectAPI) {
            reject(new Error('Connect API not available'));
            return;
        }

        connectAPI.request(url, {
            contentType: 'application/json',
            ...options,
            data: options?.data ? JSON.stringify(options.data) : undefined,
            success: (result) => {
                if (result) {
                    resolve(JSON.parse(result) as TResult);
                } else {
                    resolve(undefined as TResult);
                }
            },
            error: ({ responseText, status }) => {
                reject(
                    new Error(
                        `Request failed with status ${status}${
                            responseText ? `: ${responseText}` : ''
                        }`,
                    ),
                );
            },
        });
    });
};
