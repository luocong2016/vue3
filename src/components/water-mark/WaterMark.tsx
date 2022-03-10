import {
  defineComponent,
  ref,
  watchEffect,
  type CSSProperties,
  type PropType,
  type ExtractPropTypes,
} from 'vue';

import { makeNumericProp, makeNumberProp, makeStringProp, createNamespace } from '@/utils';

export type fontStyleType = 'none' | 'normal' | 'italic' | 'oblique';
export type fontWidthType = 'normal' | 'light' | 'weight' | number;

const waterMarkProps = {
  markStyle: String as PropType<CSSProperties>,
  markClassName: String,
  gapX: makeNumberProp(212),
  gapY: makeNumberProp(212),
  zIndex: makeNumberProp(9),
  width: makeNumberProp(120),
  height: makeNumberProp(64),
  offsetTop: Number,
  offsetLeft: Number,
  rotate: makeNumberProp(-22),
  image: String,
  content: String,
  fontColor: makeStringProp('rgba(0,0,0,.15)'),
  fontStyle: makeStringProp<fontStyleType>('normal'),
  fontFamily: makeStringProp('sans-serif'),
  fontWeight: makeNumericProp<fontWidthType>('normal'),
  fontSize: makeNumericProp(16)
};

const [name, bem] = createNamespace('water-mark');

export type WaterMarkProps = ExtractPropTypes<typeof waterMarkProps>;

/**
 * 返回当前显示设备的物理像素分辨率与CSS像素分辨率之比
 *
 * @param context
 * @see api 有些废弃了，其实类型 CanvasRenderingContext2D
 */
const getPixelRatio = (context: any) => {
  if (!context) {
    return 1;
  }
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};

export default defineComponent({
  name,

  props: waterMarkProps,

  setup(props, { slots }) {
    const base64Url = ref<string>();

    watchEffect(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const ratio = getPixelRatio(ctx);
      const canvasWidth = `${(props.gapX + props.width) * ratio}px`;
      const canvasHeight = `${(props.gapY + props.height) * ratio}px`;
      const canvasOffsetLeft = props.offsetLeft || props.gapX / 2;
      const canvasOffsetTop = props.offsetTop || props.gapY / 2;
      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);
      if (ctx) {
        ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
        ctx.rotate((Math.PI / 180) * Number(props.rotate));
        const markWidth = props.width * ratio;
        const markHeight = props.height * ratio;
        if (props.image) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.referrerPolicy = 'no-referrer';
          img.src = props.image;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, markWidth, markHeight);
            base64Url.value = canvas.toDataURL()
          };
        } else if (props.content) {
          const markSize = Number(props.fontSize) * ratio;
          ctx.font = `${props.fontStyle} normal ${props.fontWeight} ${markSize}px/${markHeight}px ${props.fontFamily}`;
          ctx.fillStyle = props.fontColor;
          ctx.fillText(props.content, 0, 0);
          base64Url.value = canvas.toDataURL();
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('当前环境不支持Canvas');
      }
    });

    return () => <div class={bem('wrapper')}>
      {slots.default?.()}
      <div
        class={[bem(), props.markClassName]}
        style={{
          zIndex: props.zIndex,
          backgroundSize: `${props.gapX + props.width}px`,
          backgroundImage: `url('${base64Url.value}')`,
          ...props.markStyle,
        }}
      />
    </div>
  }
});

