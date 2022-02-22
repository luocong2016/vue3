
type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>


export interface Options<T> {
  containerTarget: BasicTarget;
}

export const userVirtualList = <T = any>(list: T[], options: Options<T>) => {
  const { containerTarget, wrapperTarget, itemHeight, overscan = 5 } = options;
}