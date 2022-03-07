<script lang="tsx">
import { defineComponent } from "vue";
import { useRoute } from "@/use/useRoute";

export default defineComponent({
  props: {
    url: {
      type: String,
      default: "/use/useRect",
    },
  },

  setup() {
    const route = useRoute();
    return () => (
      <div>
        <button onClick={route}>Route</button>
      </div>
    );
  },
});
</script>
