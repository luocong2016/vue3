// https://github.com/youzan/vant/blob/c378b388c282fa57c437f50a7d1a9d4121a76573/packages/vant/src/tabbar/Tabbar.tsx
// 等高占位符

import type { Ref } from 'vue';
import type { BEM } from '@/utils/create';

import { useHeight } from './use-height';

export function usePlaceholder(contentRef: Ref<Element | undefined>, bem: BEM) {
  const height = useHeight(contentRef);

  return (renderContent: () => JSX.Element) => (
    <div
      class={bem('placeholder')}
      style={{ height: height.value ? `${height.value}px` : undefined }}
    >
      {renderContent()}
    </div>
  );
}
