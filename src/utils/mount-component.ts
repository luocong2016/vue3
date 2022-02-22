// https://github.com/youzan/vant/blob/00bb1d2f1ffc88ec6098a0a293755601a661e3fb/packages/vant/src/dialog/function-call.tsx
import _ from 'lodash';
import { type Component, createApp, reactive } from 'vue';
import { useExpose } from '@/composables/use-expose';

export function usePopupState() {
  const state = reactive<{ show: boolean, [key: string]: any; }>({ show: false });

  const toggle = (show: boolean) => { state.show = show; };

  const open = (props: Record<string, any>) => {
    _.assign(state, props, { transitionAppear: true });
    toggle(true);
  };

  const close = () => toggle(false);

  useExpose({ open, close, toggle });

  return { open, close, toggle, state };
}

export function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent);
  const root = document.createElement('div');

  document.body.appendChild(root);

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    }
  }
}
