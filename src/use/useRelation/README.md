# useRelation
建立父子组件之间的关联关系，进行数据通信和方法调用，基于`provide`和`inject`实现。

## Usage
### 基础用法
```tsx
import { defineComponent, ref, InjectionKey, Ref } from "vue";
import { useChildren, useParent } from "@/use";

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
```

## API
### Types
```ts
function useParent<T>(key: string | symbol): {
  parent?: T;
  index?: Ref<number>;
};

function useChildren(key: string | symbol): {
  children: ComponentPublicInstance[];
  linkChildren: (value: any) => void;
};
```

### useParent Returns
| 参数   | 说明                                         | 类型          |
|--------|----------------------------------------------|---------------|
| parent | 父组件提供的值                               | any           |
| index  | 当前组件在父组件的所有子组件中对应的索引位置 | Ref\<number\> |

### useChildren Returns
| 参数         | 说明                 | 类型                      |
|--------------|----------------------|---------------------------|
| children     | 子组件列表           | ComponentPublicInstance[] |
| linkChildren | 向子组件提供值的方法 | (value: any) => void      |
