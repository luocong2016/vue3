<script lang="tsx">
import { defineComponent, ref, InjectionKey, Ref } from "vue";
import { useChildren, useParent } from "@/use/useRelation";

type MyProvide = {
  add: () => void;
  count: Ref<number>;
};

const RELATION_KEY: InjectionKey<MyProvide> = Symbol("my-relation");

const ParentCom = defineComponent({
  setup(props, { slots }) {
    const { linkChildren } = useChildren(RELATION_KEY);
    const count = ref(0);
    const add = () => {
      count.value++;
    };

    linkChildren({ add, count });

    return () => (
      <div>
        <div>{count.value}</div>
        {slots.default?.()}
      </div>
    );
  },
});

const ChildCom = defineComponent({
  setup(props, { slots }) {
    const { parent } = useParent(RELATION_KEY);

    if (parent) {
      return () => <button onClick={() => parent.add()}>{slots.default?.()}</button>;
    }

    return () => null;
  },
});

export default defineComponent({
  setup() {
    return () => (
      <ParentCom>
        <ChildCom>1</ChildCom>
        <ChildCom>2</ChildCom>
      </ParentCom>
    );
  },
});
</script>
