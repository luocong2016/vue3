export const inBrowser = typeof window !== 'undefined';

export const isIOS = (): boolean =>
  inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;

export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  Object.prototype.toString.call(val) === '[object Promise]';
