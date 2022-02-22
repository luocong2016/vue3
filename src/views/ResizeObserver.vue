<script lang="tsx">
import { defineComponent } from 'vue';
// https://www.npmjs.com/package/resize-observer-polyfill
import ResizeObserver from 'resize-observer-polyfill';

export default defineComponent({
  setup() {
    const ro = new ResizeObserver((entries /*, observer*/) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;
        console.log(left, top, width, height);
      }
    });

    ro.observe(document.body);

    return () => <div>12</div>;
  },
});
</script>
