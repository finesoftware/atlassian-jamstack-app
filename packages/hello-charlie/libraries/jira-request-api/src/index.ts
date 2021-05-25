export interface Options {
    type?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: { [param: string]: unknown };
    experimental?: boolean;
}

export type Request = <TResult extends unknown>(url: string, options?: Options) => Promise<TResult>;
