<script lang="tsx">
import { defineComponent, reactive, ref } from "vue";
import { useRect } from "@/use/useRect";

export default defineComponent({
  setup() {
    const root = ref<HTMLElement>();
    const domRect = reactive<DOMRect | Record<string, any>>({});

    const handleClick = () => {
      const rect: DOMRect = useRect(root);
      // Object.assign(domRect, rect); // 错误！！！无法解构`DOMRect`对象
      const { top, bottom, width, height, right, left } = rect;
      Object.assign(domRect, { top, bottom, width, height, right, left });
    };

    return () => (
      <div
        ref={root}
        style="width:300px;height:300px;border:1px solid #ccc;margin: 50px auto;word-break:break-all;"
      >
        <button onClick={handleClick}>click</button>
        <br />
        {JSON.stringify(domRect)}
      </div>
    );
  },
});
</script>
