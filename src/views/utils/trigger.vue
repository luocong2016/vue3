<script lang="tsx">
import { defineComponent, ref } from 'vue';
import { Button } from 'ant-design-vue';
import { trigger } from '@/utils';

export default defineComponent({
  setup() {
    const count = ref(0);
    const addBtn = ref();
    const handleAdd = () => {
      count.value += 1;
    };
    const handleClick1 = () => {
      const addButton = document.getElementById('add');
      console.log(trigger(addButton, 'click'));
    };

    const handleClick = () => {
      console.log(trigger(addBtn, 'click'));
    };

    return () => (
      <div>
        <div>{count.value}</div>

        <span id="add" onClick={handleAdd} style="background-color: #ccc">
          +1
        </span>
        <Button type="link" onClick={handleClick1}>
          DOM trigger
        </Button>

        <br />

        <Button ref={addBtn} type="link" onClick={handleAdd}>
          +
        </Button>
        <Button type="link" onClick={handleClick}>
          ref trigger
        </Button>
      </div>
    );
  },
});
</script>
