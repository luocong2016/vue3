<script lang="tsx">
import { defineComponent } from "vue";
import { useToggle } from "@/use/useToggle";

export default defineComponent({
  setup() {
    const [state, toggle] = useToggle();
    return () => (
      <div>
        <div>{Boolean(state.value).toString()}</div>
        <button onClick={() => toggle()}>toggle</button>
      </div>
    );
  },
});
</script>
