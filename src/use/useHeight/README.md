# useHeight
监听获取目标元素高度

## Usage
### 基础用法
```tsx
import { defineComponent, ref } from 'vue';
import { useHeight } from '@/use';

export default defineComponent({
  setup() {
    const contentRef = ref();
    const height = useHeight(contentRef);

    return () => <div ref={contentRef} style="height: 100px">
      { height.value }
    </div>
  }
});
```

## API
### Types
```ts
function useHeight (element: Element | Ref<Element | undefined>): Ref<number>;
```

### Params
| 参数    | 说明     | 类型                       | 默认值 |
|---------|----------|----------------------------|--------|
| element | 目标元素 | Element \| Ref\<Element \> | -      |

### Returns
| 参数   | 说明         | 类型          | 默认值 |
|--------|--------------|---------------|--------|
| height | 目标元素高度 | Ref\<number\> | -      |
