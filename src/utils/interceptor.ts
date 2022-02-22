import { isPromise } from './validate';

export type Interceptor = (...args: any[]) => Promise<boolean> | boolean | void;

export function callInterceptor(
  interceptor: Interceptor | undefined,
  { args = [], done, canceled }: { args?: unknown[]; done: () => void; canceled?: () => void; }
) {
  if (interceptor) {
    // eslint-disable-next-line prefer-spread
    const returnVal = interceptor.apply(null, args);

    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (value) {
            done();
          } else if (canceled) {
            canceled();
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => { })
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}