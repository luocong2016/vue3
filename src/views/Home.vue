<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    button
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import { useRoute } from "@/composables/use-route";

import Empty from "@/components/empty";
import "@/style/base.less";
import "@/components/empty/index.less";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    Empty,
  },
  mounted() {
    useRoute();
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
