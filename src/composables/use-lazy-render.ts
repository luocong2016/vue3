// https://github.com/youzan/vant/blob/00bb1d2f1ffc88ec6098a0a293755601a661e3fb/packages/vant/src/popup/Popup.tsx
import { type WatchSource, ref, watch } from 'vue';

export function useLazyRender(show: WatchSource<boolean | undefined>) {
  const inited = ref(false);

  watch(
    show,
    (value) => {
      if (value) {
        inited.value = value;
      }
    },
    {
      immediate: true,
    }
  );

  return (render: () => JSX.Element) => inited.value ? render() : null;
}
