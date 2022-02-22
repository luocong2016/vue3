// https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html

import { type Ref, onDeactivated, onBeforeUnmount } from 'vue';
import { onMountedOrActivated } from '@/use'
import { inBrowser } from '@/utils';

export function useVisibilityChange(
  target: Ref<Element | undefined>,
  onChange: (visible: boolean) => void
) {
  if (!inBrowser || !window.IntersectionObserver) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      onChange(entries[0].intersectionRatio > 0);
    },
    {
      root: document.body,
    }
  );

  const observe = () => {
    if (target.value) {
      observer.observe(target.value);
    }
  };

  const unobserve = () => {
    if (target.value) {
      observer.unobserve(target.value);
    }
  };

  // const disconnect = () => {
  //   observer.disconnect();
  // }

  onDeactivated(unobserve);
  onBeforeUnmount(unobserve);
  onMountedOrActivated(observe);
}
