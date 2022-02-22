export type Writeable<T> = { -readonly [P in keyof T]: T[P] };


/*
  pick({a: 1}, ['a', 'b']) => { a: 1, b: undefined }
  pick({a: 1}, ['a', 'b'], true) => { a: 1 }
*/
export function pick<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
  ignoreUndefined?: boolean
) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== undefined) {
      ret[key] = obj[key];
    }
    return ret;
  }, {} as Writeable<Pick<T, U>>);
}
