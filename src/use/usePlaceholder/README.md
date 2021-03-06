# usePlaceholder
生成一个等高占位符容器元素

## Usage
### 基础用法
```tsx
import { defineComponent, ref } from "vue";
import { usePlaceholder } from "@/use";
import { createNamespace } from "@/utils";

const [name, bem] = createNamespace("placeholder");

export default defineComponent({
  name,

  setup() {
    const isPlaceholder = ref(false);
    const handleToggle = () => {
      isPlaceholder.value = !isPlaceholder.value;
    };
    const root = ref<HTMLElement>();
    const renderPlaceholder = usePlaceholder(root, bem);

    const renderTabbar = () => (
      <div ref={root}>{isPlaceholder.value ? "容器" : "元素"}</div>
    );

    return () => (
      <div>
        <button onClick={handleToggle}>isPlaceholder</button>
        {isPlaceholder.value ? renderPlaceholder(renderTabbar) : renderTabbar()}
      </div>
    );
  },
});
```

## API
### Types
```ts
function usePlaceholder(contentRef:  Ref<Element | undefined>, bem: BEM): (renderContent: () => JSX.Element) => JSX.Element
```

### Returns
| 参数          | 说明         | 类型                       | 默认值 |
|---------------|--------------|----------------------------|--------|
| renderContent | 需要占位元素 | Ref\<Element \| undefined> | -      |
