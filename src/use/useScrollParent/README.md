# useScrollParent
获取元素最近的可滚动父元素

## Usage
### 基础用法
```tsx
import { defineComponent, ref } from "vue";
import { useEventListener, useScrollParent } from "@/use";

export default defineComponent({
  setup() {
    const root = ref<HTMLElement>();
    const scrollParent = useScrollParent(root);

    useEventListener(
      "scroll",
      () => {
        console.log("scroll");
      },
      {
        target: scrollParent,
      }
    );

    return () => (
      <div ref={root} style={{ height: "1700px" }}>
        root
      </div>
    );
  },
});
```

## API
### Types
```ts
function useScrollParent(
  element: Ref<Element | undefined>
): Ref<Element | Window | undefined>;
```

### Params
| 参数    | 说明     | 类型           | 默认值 |
|---------|----------|----------------|--------|
| element | 当前元素 | Ref\<Element\> | -      |

### Returns
| 参数         | 说明               | 类型           |
|--------------|--------------------|----------------|
| scrollParent | 最近的可滚动父元素 | Ref\<Element\> |
