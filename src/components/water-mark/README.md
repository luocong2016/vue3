# WaterMark
    
### Install
全局使用

```js
import { createApp } from 'vue';
import { WaterMark } from '@/components';

const app = createApp();
app.use(WaterMark);
```

组件内使用

```js
import { defineComponent } from 'vue';
import { WaterMark } from '@/components';

export default defineComponent({
  components: { WaterMark }
});
```

## Usage
### 基础用法
```tsx
import { defineComponent } from 'vue';
import { WaterMark } from '@/components';

export default defineComponent({
  components: { WaterMark },

  setup() {
    return () => <WaterMark content="lutz">
      <div style="height: 500px; background: rgba(0,0,0,.005)" />
    </WaterMark>
  }
});
```

## API
### Props
| 参数          | 说明                                                                                           | 类型               | 默认值                 | 版本 |
|---------------|------------------------------------------------------------------------------------------------|--------------------|------------------------|------|
| width         | 水印的宽度                                                                                     | _number_           | `120`                  | -    |
| height        | 水印的搞度                                                                                     | _number_           | `64`                   | -    |
| rotate        | 水印绘制时，旋转的角度，单位 °                                                                 | _number_           | `-22`                  | -    |
| image         | 图片源，建议导出`2`倍或`3`倍图，优先使用图片渲染水印                                           | _string_           | -                      | -    |
| zIndex        | 追加的水印元素的`z-index`                                                                      | _number_           | `9`                    | -    |
| content       | 水印文字内容                                                                                   | _string_           | -                      | -    |
| fontColor     | 水印文字颜色                                                                                   | _string_           | `rgba(0,0,0,.15)`      | -    |
| fontSize      | 文字大小                                                                                       | _string \| number_ | `16`                   | -    |
| markStyle     | 水印层的样式                                                                                   | _CSSProperties_    | -                      | -    |
| markClassName | 水印层的类名                                                                                   | _string_           | -                      | -    |
| gapX          | 水印之间的水平间距                                                                             | _number_           | `212`                  | -    |
| gapY          | 水印之间的垂直间距                                                                             | _number_           | `222`                  | -    |
| offsetLeft    | 水印在 canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即`offsetTop = gapX / 2` | _number_           | `offsetTop = gapX / 2` | -    |
| offsetTop     | 水印在 canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即`offsetTop = gapY / 2` | _number_           | `offsetTop = gapY / 2` | -    |

### Slots
| 名称    | 说明             | 版本 |
|---------|------------------|------|
| default | 水印包裹的子元素 | -    |

### Type
```ts
import type { WaterMarkProps, fontStyleType, fontWidthType } from '@/components/water-mark';
```
