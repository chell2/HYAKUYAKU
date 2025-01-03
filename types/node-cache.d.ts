declare module 'node-cache' {
  export default class NodeCache {
    constructor(options?: { stdTTL?: number });
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T, ttl?: number): boolean;
    del(key: string): void;
  }
}
