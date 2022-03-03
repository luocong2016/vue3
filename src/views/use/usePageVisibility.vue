<script lang="tsx">
import { defineComponent, watch } from "vue";
import { usePageVisibility } from "@/use/usePageVisibility";

export default defineComponent({
  setup() {
    const pageVisibility = usePageVisibility();

    watch(pageVisibility, (value) => {
      console.log("visibility: ", value);
    });

    return () => (
      <div style="height: 1500px">
        <div style="margin-top: 800px; width: 200px; height: 200px;background: red;"></div>
      </div>
    );
  },
});
</script>
