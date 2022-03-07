<script lang="tsx">
import { defineComponent, ref } from "vue";
import { useVisibility } from "@/use";

const VisibilityContainer = defineComponent({
  setup() {
    const root = ref();
    useVisibility(root, (visible) => {
      console.log("visible:", visible);
    });
    return () => (
      <div
        ref={root}
        style="width: 200px;height: 200px; background-color: red;margin-top: 50px;"
      />
    );
  },
});

export default defineComponent({
  setup() {
    return () => (
      <div style="height: 1500px;">
        <VisibilityContainer />
      </div>
    );
  },
});
</script>
