import {
  Transition,
  defineComponent,
  type ExtractPropTypes,
  type PropType,
  type CSSProperties,
} from 'vue';

import {
  truthProp,
  numericProp,
  unknownProp,
  preventDefault,
  createNamespace,
  getZIndexStyle,
  prefixe,
} from '@/utils';

import { useLazyRender } from '@/composables/use-lazy-render';
import _ from 'lodash';

const [name, bem] = createNamespace('overlay');

const overlayProps = {
  show: Boolean,
  zIndex: numericProp,
  duration: numericProp,
  className: unknownProp,
  lockScroll: truthProp,
  lazyRender: truthProp,
  customStyle: Object as PropType<CSSProperties>,
};

export type OverlayProps = ExtractPropTypes<typeof overlayProps>;

export default defineComponent({
  name,

  props: overlayProps,

  setup(props, { slots }) {
    const lazyRender = useLazyRender(() => props.show || !props.lazyRender);

    const preventTouchMove = (event: TouchEvent) => {
      preventDefault(event, true);
    };

    const renderOverlay = lazyRender(() => {
      const style: CSSProperties = _.assign(
        getZIndexStyle(props.zIndex),
        props.customStyle
      );

      if (!_.isNil(props.duration)) {
        style.animationDuration = `${props.duration}s`;
      }

      return (
        <div
          v-show={props.show}
          style={style}
          class={[bem(), props.className]}
          onTouchmove={props.lockScroll ? preventTouchMove : () => { }}
        >
          {slots.default?.()}
        </div>
      );
    });

    return () => (
      <Transition v-slots={{ default: renderOverlay }} name={`${prefixe}-fade`} appear />
    );
  },
})
