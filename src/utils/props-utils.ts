import type { ComponentPublicInstance } from 'vue';

// eslint-disable-next-line
export type ComponentInstance = ComponentPublicInstance<{}, any>;
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function findDOMNode(instance: ComponentInstance): Element | null {
  let node = instance?.vnode?.el || (instance && (instance.$el || instance));
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
}

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
