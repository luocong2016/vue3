import { watch, onMounted, Ref } from 'vue'
import { inBrowser } from '@/utils';
import { useEventListener } from '../../useEventListener';

type useRefreshOnWindowFocusPluginOption = {
  refreshOnWindowFocus: Ref<boolean>;
  focusTimespan: Ref<number>;
}

export function useRefreshOnWindowFocusPlugin(
  fetchInstance: () => {},
  { refreshOnWindowFocus, focusTimespan }: useRefreshOnWindowFocusPluginOption
) {
  watch([refreshOnWindowFocus, focusTimespan], ([refreshOnWindowFocusVal, focusTimespanVal]) => {
    if (inBrowser && !document.hidden && refreshOnWindowFocusVal) {
      console.log(1)
      console.log(refreshOnWindowFocusVal, focusTimespanVal)
    }
  })
}
