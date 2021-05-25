type APRequestError = {
    status: number;
    responseText?: string;
};

type APRequestOptions = {
    url?: string;
    type?: string;
    cache?: boolean;
    data?: unknown;
    contentType?: string;
    headers?: Record<string, string>;
    success?: (result?: string) => void;
    error?: (result: APRequestError) => void;
    experimental?: boolean;
};

type APRequestOptionsWithUrl = APRequestOptions & {
    url: string;
};

type AP = {
    request: (
        urlOrOptionsWithUrl: string | APRequestOptionsWithUrl,
        options?: APRequestOptions,
    ) => void;
    navigator: {
        go: (target: string, context: unknown) => void;
    };
};

export const getConnectAPI = () => (window as any).AP as AP | undefined;
