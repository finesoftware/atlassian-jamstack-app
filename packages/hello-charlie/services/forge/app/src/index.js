import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('ping-pong', async (req) => {
    return { req };
});

export const handler = resolver.getDefinitions();
