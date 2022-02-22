<script lang="tsx">
import { defineComponent, onMounted, ref } from "vue";
import { useRect } from "@/use/useRect";

export default defineComponent({
  setup() {
    const root = ref<HTMLElement>();

    onMounted(() => {
      const rect: DOMRect = useRect(root);
      console.log(rect);
    });

    return () => <div ref={root}>root</div>;
  },
});
</script>
