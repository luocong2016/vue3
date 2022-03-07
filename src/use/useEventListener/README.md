# useEventListener
方便地进行事件绑定，在组件`mounted`和`activated`时绑定事件，`unmounted`和`deactivated`时解绑事件。

## Usage
### 基础用法
```tsx
import { defineComponent } from 'vue';
import { useEventListener } from '@/use';

export defualt defineComponent({
  setup() {
    // 在 window 上绑定 resize 事件
    // 未指定监听对象时，默认会监听 window 的事件
    useEventListener(
      'resize',
      () => {
        console.log('window resize');
      }
    );

    // 在 body 元素上绑定 click 事件
    useEventListener(
      'click',
      () => {
        console.log('click body')
      },
      {
        target: document.body
      }
    );
  }
});
```

## API
### Types
```ts
type Options = {
  target?: EventTarget | Ref<EventTarget>;
  capture?: boolean;
  passive?: boolean;
};

function useEventListener(
  type: string,
  listener: EventListener,
  options?: Options
): void;
```

### Params
| 参数     | 说明           | 类型          | 默认值 |
|----------|----------------|---------------|--------|
| type     | 监听的事件类型 | string        | -      |
| listener | 事件回调函数   | EventListener | -      |
| options  | 可选的配置项   | Options       | -      |

### Options
| 参数    | 说明                                                   | 类型                              | 默认值   |
|---------|--------------------------------------------------------|-----------------------------------|----------|
| target  | 绑定事件的元素                                         | EventTarget \| Ref\<EventTarget\> | `window` |
| capture | 是否在事件捕获阶段触发                                 | boolean                           | `false`  |
| options | 设置为`true`时，`listener`永远不会调用`preventDefault` | boolean                           | `false`  |
