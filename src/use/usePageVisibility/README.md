# usePageVisibility
获取页面的可见状态

## Usage
### 基础用法
```ts
import { defineComponent, watch } from 'vue';
import { usePageVisibility } from '@/use';

export default defineComponent({
  setup() {
    const pageVisibility = usePageVisibility();

    watch(pageVisibility, (value) => {
      console.log('visibility: ', value);
    });
  },
});
```

## API
### Types
```ts
type VisibilityState = 'visible' | 'hidden';

function usePageVisibility(): Ref<VisibilityState>;
```

### Returns
| 参数            | 说明                                                | 类型                   | 默认值 |
|-----------------|-----------------------------------------------------|------------------------|--------|
| visibilityState | 页面当前的可见状态，`visible`为可见，`hidden`为隐藏 | Ref\<VisibilityState\> | -      |
