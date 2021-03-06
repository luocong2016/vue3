# useRoute
通过透传`vue-router`所需的`to`、`url`、`replace`、`$router`属性，实现路由跳转

## Usage
### 基础用法
```tsx
import { defineComponent } from "vue";
import { useRoute } from "@/use";

export default defineComponent({
  props: {
    url: {
      type: String,
      default: "/use/useRect",
    },
  },

  setup() {
    const route = useRoute();

    return () => (
      <div>
        <button onClick={route}>Route</button>
      </div>
    );
  },
});
```

## API
### Types
```ts
function useRoute(): () => void;
```
