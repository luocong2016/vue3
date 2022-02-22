import {
  ref,
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  type ExtractPropTypes,
  type Ref
} from 'vue';
import { makeStringProp, makeRequiredProp } from '@/utils/props';

const itemProps = {
  index: Number,
  event: String,
  tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
  horizontal: Boolean,
  source: Object,
  component: makeRequiredProp<any>([Object, Function]),
  uniqueKey: makeRequiredProp([String, Number]),
  extraProps: Object,
  scopedSlots: Object,
};

export type ItemProps = ExtractPropTypes<typeof itemProps>;

const slotProps = {
  event: String,
  uniqueKey: makeRequiredProp([String, Number]),
  tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
  horizontal: Boolean,
};

export type SlotProps = ExtractPropTypes<typeof slotProps>;

const useResizeChange = (
  props: any,
  rootRef: Ref<HTMLElement | null>,
  emit: any,
) => {
  let resizeObserver: ResizeObserver | null = null;
  const shapeKey = computed(() =>
    props.horizontal ? 'offsetWidth' : 'offsetHeight',
  );

  const getCurrentSize = () => {
    return rootRef.value ? rootRef.value[shapeKey.value] : 0;
  };

  // tell parent current size identify by unqiue key
  const dispatchSizeChange = () => {
    const { event, uniqueKey, hasInitial } = props;
    emit(event, uniqueKey, getCurrentSize(), hasInitial);
  };

  onMounted(() => {
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        dispatchSizeChange();
      });
      rootRef.value && resizeObserver.observe(rootRef.value);
    }
  });

  onUpdated(() => {
    dispatchSizeChange();
  });

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });
};

export const Item = defineComponent({
  name: 'VirtualListItem',
  props: itemProps,
  emits: ['itemResize'],
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null);
    useResizeChange(props, rootRef, emit);

    return () => {
      const {
        tag: Tag,
        component: Comp,
        extraProps = {},
        index,
        source,
        scopedSlots = {},
        uniqueKey,
      } = props;
      const mergedProps = {
        ...extraProps,
        source,
        index,
      };

      debugger;

      return (
        <Tag key={uniqueKey} ref={rootRef}>
          <Comp {...mergedProps} scopedSlots={scopedSlots} />
        </Tag>
      );
    };
  },
});

export const Slot = defineComponent({
  name: 'VirtualListSlot',
  props: slotProps,
  emits: ['slotResize'],
  setup(props, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null);
    useResizeChange(props, rootRef, emit);

    return () => {
      const { tag: Tag, uniqueKey } = props;

      return (
        <Tag ref={rootRef} key={uniqueKey}>
          {slots.default?.()}
        </Tag>
      );
    };
  },
});