# useLazyRender
仅第一次为真时，才渲染，类似`v-if`

## Usage
### 基础用法
```tsx
import { defineComponent, ref } from "vue";
import { useLazyRender } from "@/use";

export default defineComponent({
  setup() {
    const show = ref<boolean>(false);
    const lazyRender = useLazyRender(show);
    const render = lazyRender(() => <div>{show.value ? "show" : "hide"}</div>);
    const handleToggle = () => {
      show.value = !show.value;
    };

    return () => (
      <div>
        <button onClick={handleToggle}>{show.value ? "show" : "hide"}</button>
        {render()}
      </div>
    );
  },
});
```

## API
### Types
```ts
function useLazyRender(show: WatchSource<boolean | undefined>): (render: () => JSX.Element) => JSX.Element | null;
```

### Params
| 参数 | 说明     | 类型                                | 默认值 |
|------|----------|-------------------------------------|--------|
| show | 是否可见 | WatchSource\<boolean \| undefined\> | -      |
