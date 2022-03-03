<template>
  <div class="home">
    <!-- 基础用法 -->
    <Empty description="描述文字" />
    <!-- 通用错误 -->
    <Empty image="error" description="描述文字" />
    <!-- 网络错误 -->
    <Empty image="network" description="描述文字" />
    <!-- 搜索提示 -->
    <Empty image="search" description="描述文字" />
    <!-- 自定义图片 -->
    <Empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="描述文字"
    />
    <!-- 底部内容 -->
    <Empty description="描述文字A">
      <button>按钮</button>
    </Empty>

    <br />
    <button @click="handleSwitch(true)">显示遮罩</button>
    <Overlay :show="show" @click="handleSwitch(false)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "@/composables/use-route";

import Empty from "@/components/empty";
import "@/components/empty/index.less";

import Overlay from "@/components/overlay";
import "@/components/overlay/index.less";

export default defineComponent({
  name: "Home",
  components: {
    Empty,
    Overlay,
  },
  setup() {
    const show = ref(false);

    const handleSwitch = (bool: boolean) => {
      show.value = bool;
      console.log(bool);
    };

    watch(show, (value) => {
      console.log("show", value);
    });

    onMounted(() => {
      useRoute();
    });

    return {
      show,
      handleSwitch,
    };
  },
});
</script>

<style lang="less" scoped>
.custom-image {
  :deep(.lc-empty__image) {
    width: 90px;
    height: 90px;
  }
}
</style>
