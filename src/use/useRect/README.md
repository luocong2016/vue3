# useRect

## Usage
### 基础用法
```tsx
import { defineComponent, ref, onMounted } from 'vue';
import { useRect } from '@/use';

export default defineComponent({
  setup() {
    const root = ref();

    onMounted(() => {
      const rect = useRect(root);
      console.log(rect); // -> 元素的大小及其相对于视口的位置
    });

    return () => <div ref={root} style="height: 100px" />
  }
});
```

## API
### Types
```ts
function useRect(
  element: Element | Window | Ref<Element | Window | undefined>
): DOMRect;
```

### Params
| 参数    | 说明             | 类型                                          | 默认值 |
|---------|------------------|-----------------------------------------------|--------|
| element | 需要获取视口元素 | Element \| Window \| Ref\<Element \| Window\> | -      |

### Return
| 参数   | 说明                       | 类型   |
|--------|----------------------------|--------|
| width  | 宽度                       | number |
| height | 高度                       | number |
| top    | 顶部与视图窗口左上角的距离 | number |
| left   | 左侧与视图窗口左上角的距离 | number |
| right  | 右侧与视图窗口左上角的距离 | number |
| bottom | 底部与视图窗口左上角的距离 | number |
