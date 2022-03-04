import {
  ref,
  onMounted,
  nextTick,
  type Ref
} from 'vue';
import { useRect } from '../useRect';

export const useHeight = (element: Element | Ref<Element | undefined>) => {
  const height = ref<number>();

  onMounted(() => {
    nextTick(() => {
      height.value = useRect(element).height
    })
  });

  return height;
};
