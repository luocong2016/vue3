import { getCurrentInstance } from 'vue';

export function useExpose<T = Record<string, any>>(apis: T) {
  const vm = getCurrentInstance()!.proxy;
  if (vm) {
    Object.assign(vm, apis);
  }
}