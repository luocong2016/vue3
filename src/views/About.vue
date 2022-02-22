<script lang="tsx">
import { defineComponent, reactive, ref, onMounted } from 'vue';

const Comp = defineComponent({
  setup(props, { expose }) {
    const observed = reactive({
      a: 1,
    });
    const setObservedA = (v: number) => {
      observed.a = v;
    };
    expose({ setObservedA });
    return () => <div>{observed.a}</div>;
  },
});

export default defineComponent({
  setup() {
    const comp = ref();
    onMounted(() => {
      comp.value.setObservedA(2);
    });
    return () => (
      <div>
        <Comp ref={comp} />
      </div>
    );
  },
});
</script>
