declare type Fn$1 = (...args: any) => any;
declare function RAFSettimeout(callback: Fn$1, time: number): () => void;

declare type Fn = (...args: any) => any;
declare function RAFSetInterval(callback: Fn, time: number): () => void;

export { RAFSetInterval, RAFSettimeout };
