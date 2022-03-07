# useWindowSize
获取浏览器窗口的视口宽度和高度，并在窗口大小变化时自动更新

## Usage
### 基础用法
```tsx
import { defineComponent, watch } from 'vue';
import { useVisibility } from '@/use';

export default defineComponent({
  setup() {
    const { width, height } = useWindowSize();

    console.log(width.value); // -> 窗口宽度
    console.log(height.value); // -> 窗口高度

    watch([width, height], () => {
      console.log('window resized');
    });
  }
});
```

## API
### Types
```ts
function useWindowSize(): {
  width: Ref<number>;
  height: Ref<number>;
};
```

### Returns
| 参数   | 说明           | 类型          |
|--------|----------------|---------------|
| width  | 浏览器窗口宽度 | Ref\<number\> |
| height | 浏览器窗口高度 | Ref\<number\> |
