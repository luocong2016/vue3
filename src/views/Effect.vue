<script lang="tsx">
import {
  defineComponent,
  computed,
  ref,
  watch, watchEffect,
  effectScope,
  getCurrentScope,
  onScopeDispose
} from 'vue'

export default defineComponent({
  setup() {
    const scope = effectScope()

    const counter = ref(1)

    const handleAdd = () => ++counter.value

    scope.run(() => {
      const doubled = computed(() => counter.value * 2)

      watch(doubled, () => {
        console.log('doubled', doubled.value)
      });

      watchEffect(() => {
        if (doubled.value === 10) {
          scope.stop()
        }
        console.log('Count: ', doubled.value)
      })
    })

    console.log(getCurrentScope())

    onScopeDispose(() => {
      console.log(1)
    })

    return () => <div>
      <div>{counter.value}</div>
      <button onClick={handleAdd}>+</button>
    </div>;
  }
});
</script>
