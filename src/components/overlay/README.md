# Overlay

### Install
全局使用

```js
import { createApp } from 'vue';
import { Overlay } from '@/components';

const app = createApp();
app.use(Overlay);
```

组件内使用

```js
import { defineComponent } from 'vue';
import { Overlay } from '@/components';

export default defineComponent({
  components: { Overlay }
});
```

## Usage
### 基础用法
```html
<button @click="show = true">显示遮罩</button>
<Overlay :show="show" @click="show = false" />
```

```ts
import { ref } from 'vue';

export default {
  setup() {
    const show = ref<boolean>(false);
    return {
      show
    };
  }
}
```

## API
### Props
| 参数         | 说明                                             | 类型               | 默认值  | 版本 |
|--------------|--------------------------------------------------|--------------------|---------|------|
| show         | 是否展示遮罩层                                   | _boolean_          | `false` | -    |
| z-index      | z-index 层级                                     | _number \| string_ | `1`     | -    |
| duration     | 动画时长，单位秒，设置为 0 可以禁用动画          | _number \| string_ | `0.3`   | -    |
| class-name   | 自定义类名                                       | _string_           | -       | -    |
| custom-style | 自定义样式                                       | _object_           | -       | -    |
| lock-scroll  | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动 | _boolean_          | `true`  | -    |
| lazy-render  | 是否在显示时才渲染节点                           | _boolean_          | `true`  | -    |

### Events
| 事件名 | 说明       | 回调              | 版本 |
|--------|------------|-------------------|------|
| click  | 点击时触发 | event: MouseEvent | -    |

### Slots

| 名称    | 说明                               | 版本 |
|---------|------------------------------------|------|
| default | 默认插槽，用于在遮罩层上方嵌入内容 | -    |

### Types
```ts
import type { OverlayProps } from '@/components/overlay';
```

## Theming
### CSS Variables
| 名称                                  | 默认值             | 描述 |
|---------------------------------------|--------------------|------|
| --@{prefixe}-overlay-z-index          | 1                  | -    |
| --@{prefixe}-overlay-background-color | rgba(0, 0, 0, 0.7) | -    |
