import { requestJira } from '@forge/bridge';
import { Request, Options } from '@hello-charlie/jira-request-api';

export const request: Request = async <TResult extends unknown>(
    url: string,
    options: Options = {},
) => {
    const result = await requestJira(url, {
        method: options.type,
        body: options.data ? JSON.stringify(options.data) : undefined,
    });

    if (!result.ok) {
        throw new Error(
            `Request failed with status ${result.status}${
                result.body ? `: ${JSON.stringify(result.body)}` : ''
            }`,
        );
    }

    return result.body as TResult;
};
