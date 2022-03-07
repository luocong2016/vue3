<script lang="tsx">
import { defineComponent, ref } from "vue";
import { usePlaceholder } from "@/use/usePlaceholder";
import { createNamespace } from "@/utils";

const [name, bem] = createNamespace("placeholder");

export default defineComponent({
  name,

  setup() {
    const isPlaceholder = ref(false);
    const handleToggle = () => {
      isPlaceholder.value = !isPlaceholder.value;
    };
    const root = ref<HTMLElement>();
    const renderPlaceholder = usePlaceholder(root, bem);

    const renderTabbar = () => (
      <div ref={root}>{isPlaceholder.value ? "容器" : "元素"}</div>
    );

    return () => (
      <div>
        <button onClick={handleToggle}>isPlaceholder</button>
        {isPlaceholder.value ? renderPlaceholder(renderTabbar) : renderTabbar()}
      </div>
    );
  },
});
</script>
