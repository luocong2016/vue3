# Badge

### Install
全局使用

```js
import { createApp } from 'vue';
import { Badge } from '@/components';

const app = createApp();
app.use(Badge);
```

组件内使用

```js
import { defineComponent } from 'vue';
import { Badge } from '@/components';

export default defineComponent({
  components: { Badge }
});
```

## Usage
### 基础用法
```html
<Badge :content="5">
  <div class="child" />
</Badge>
<Badge :content="10" :max="5">
  <div class="child" />
</Badge>
<Badge content="Hot">
  <div class="child" />
</Badge>
<Badge dot>
  <div class="child" />
</Badge>
```

```css
@import "~@/style/var.less";

::v-deep(.@{prefixe}-badge__wrapper) {
  margin-left: var(~"--@{prefixe}-padding-md");
}

.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}
```

### 自定义徽标位置
```html
<Badge position="top-left" content="8">
  <div class="child" />
</Badge>
<Badge position="top-right" content="8">
  <div class="child" />
</Badge>
<Badge position="bottom-left" content="8">
  <div class="child" />
</Badge>
<Badge position="bottom-right" content="8">
  <div class="child" />
</Badge>
```

### 独立展示
```html
<Badge :content="20" />
<Badge :content="20" color="#1989fa" />
<Badge dot color="#1989fa" />
```

## API
### Props
| 参数      | 说明                                                                   | 类型                                   | 默认值      | 版本 |
|-----------|------------------------------------------------------------------------|----------------------------------------|-------------|------|
| color     | 徽标背景颜色                                                           | _string_                               | `#ee0a24`   | -    |
| dot       | 是否展示为小红点                                                       | _boolean_                              | `false`     | -    |
| max       | 最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效             | _number \| string_                     | -           | -    |
| offset    | 设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量，默认单位为 | _[number \| string, number \| string]_ | -           | -    |
| position  | 徽标位置，可选值为`top-left` `bottom-left` `bottom-right`              | _string_                               | `top-right` | -    |
| show-zero | 当 content 为数字 0 时，是否展示徽标                                   | _boolean_                              | `true`      | -    |
| tontent   | 徽标内容                                                               | _number \| string_                     | -           | -    |

### Slots
| 名称    | 说明             | 版本 |
|---------|------------------|------|
| default | 徽标包裹的子元素 | -    |
| content | 自定义徽标内容   | -    |

### Types
```ts
import type { BadgeProps,  BadgePosition } from '@/components/badge';
```

## Theming
### CSS Variables
| 名称                            | 默认值                                                | 描述 |
|---------------------------------|-------------------------------------------------------|------|
| --@{prefixe}-badge-size         | 16px                                                  | -    |
| --@{prefixe}-badge-color        | var(~"--@{prefixe}-white")                            | -    |
| --@{prefixe}-badge-padding      | 0 3px                                                 | -    |
| --@{prefixe}-badge-font-size    | var(~"--@{prefixe}-font-size-sm")                     | -    |
| --@{prefixe}-badge-font-weight  | var(~"--@{prefixe}-font-bold")                        | -    |
| --@{prefixe}-badge-border-width | var(~"--@{prefixe}-border-width")                     | -    |
| --@{prefixe}-badge-background   | var(~"--@{prefixe}-danger-color")                     | -    |
| --@{prefixe}-badge-dot-color    | var(~"--@{prefixe}-danger-color")                     | -    |
| --@{prefixe}-badge-dot-size     | 8px                                                   | -    |
| --@{prefixe}-badge-font         | -apple-system-font, helvetica neue, arial, sans-serif | -    |
