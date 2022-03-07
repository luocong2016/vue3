# useToggle
用于在`true`和`false`之间进行切换

## Usage
### 基础用法
```tsx
import { defineComponent } from "vue";
import { useToggle } from "@/use";

export default defineComponent({
  setup() {
    const [state, toggle] = useToggle();
    return () => (
      <div>
        <div>{Boolean(state.value).toString()}</div>
        <button onClick={() => toggle()}>toggle</button>
      </div>
    );
  },
});
```

## API
### Types
```ts
function useToggle(
  defaultValue: boolean
): [Ref<boolean>, (newValue: boolean) => void];
```

### Params
| 参数         | 说明   | 类型    | 默认值 |
|--------------|--------|---------|--------|
| defaultValue | 默认值 | boolean | -      |

### Returns
| 参数   | 说明             | 类型                         |
|--------|------------------|------------------------------|
| state  | 状态值           | Ref\<boolean\>               |
| toggle | 切换状态值的函数 | (newValue?: boolean) => void |
