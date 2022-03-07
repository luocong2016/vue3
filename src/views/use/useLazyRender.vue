<script lang="tsx">
import { defineComponent, ref } from "vue";
import { useLazyRender } from "@/use/useLazyRender";

export default defineComponent({
  setup() {
    const show = ref<boolean>(false);
    const lazyRender = useLazyRender(show);
    const render = lazyRender(() => <div>{show.value ? "show" : "hide"}</div>);
    const handleToggle = () => {
      show.value = !show.value;
    };

    return () => (
      <div>
        <button onClick={handleToggle}>{show.value ? "show" : "hide"}</button>
        {render()}
      </div>
    );
  },
});
</script>
