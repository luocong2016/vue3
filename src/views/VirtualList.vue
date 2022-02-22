<script lang="tsx">
import { defineComponent, ref, PropType } from "vue";
import VirtualList from "@/components/virtual-list";

interface Item {
  index: number;
  name: string;
  id: number;
  desc: string;
  size: number;
}

const ItemRender = defineComponent({
  props: {
    source: {
      type: Object as PropType<Item>,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => (
      <div class="item-inner">
        <div class="head">
          <span># {props.source.index}</span>
          <span>{props.source.name}</span>
        </div>
        <div class="desc">{props.source.desc}</div>
      </div>
    );
  },
});

export default defineComponent({
  setup() {
    console.log(1);
    const items = ref<Item[]>([]);
    const addItem = () => {
      items.value.push({
        index: Math.random() * 1000 + 1,
        name: "Brad" + Math.random() * 1000 + 1,
        id: Date.now(),
        desc: "html5",
        size: 150,
      });
    };

    return () => (
      <div class="container">
        <button onClick={addItem}>+1</button>
        <div class="result">Items count: {items.value.length}</div>
        <VirtualList
          ref="virtualList"
          class="list-infinite scroll-touch"
          item-class="list-item-infinite"
          data-key="id"
          data-sources={items.value}
          data-component={ItemRender}
          estimate-size={70}
        />
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.container {
  margin-top: 1em;
  background-color: #fff;
  position: relative;
  z-index: 1;
}

.scroll-touch {
  -webkit-overflow-scrolling: touch;
  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: #f4f4f4;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background: rgba(0, 0, 0, 0.12);
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #b2b2b2;
  }
}

.list-infinite {
  width: 100%;
  height: 500px;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;
  position: relative;
  .list-item-infinite {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid;
    border-color: lightgray;
  }
  .loader-wrapper {
    padding: 1em;
  }
  .loader {
    font-size: 10px;
    margin: 0px auto;
    text-indent: -9999em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ffffff;
    background: linear-gradient(to right, #9b4dca 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    animation: load3 1.4s infinite linear;
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #9b4dca;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
