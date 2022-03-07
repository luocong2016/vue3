# useExpose
一个将暴露在公共组件实例上的`property`列表,在非组件中使用。作用同`expose`相同。

## Usage
### 基础用法
```tsx
import { reactive } from 'vue';
import { useExpose } from '@/use';

export function usePopupState() {
  const state = reactive<{ show: boolean, [key: string]: any; }>({ show: false });
  const toggle = (show: boolean) => { state.show = show; };
  const open = (props: Record<string, any>) => {
    _.assign(state, props, { transitionAppear: true });
    toggle(true);
  };
  const close = () => toggle(false);

  useExpose({ open, close, toggle });

  return { open, close, toggle, state };
}
```

## API
### Types
```ts
function useExpose<T = Record<string, any>>(apis: T): void;
```

### Params
| 参数 | 说明                 | 类型   | 默认值 |
|------|----------------------|--------|--------|
| apis | 需要抛出的监听的事件 | object | -      |
