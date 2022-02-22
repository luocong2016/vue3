<script lang="tsx">
import { defineComponent, ref } from "vue";
import { useScrollParent } from "@/use/useScrollParent";
import { useEventListener } from "@/use/useEventListener";

export default defineComponent({
  setup() {
    const root = ref<HTMLElement>();
    const scrollParent = useScrollParent(root);

    useEventListener(
      "scroll",
      () => {
        console.log("scroll");
      },
      {
        target: scrollParent,
      }
    );

    return () => (
      <div ref={root} style={{ height: "1700px" }}>
        root
      </div>
    );
  },
});
</script>
