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

    <br />

    <div class="demo-badge">
      <Badge :content="5">
        <div class="child" />
      </Badge>
      <Badge :content="10" :max="5">
        <div class="child" />
      </Badge>
      <Badge content="Hot">
        <div class="child" />
      </Badge>
      <Badge dot>
        <div class="child" />
      </Badge>
    </div>

    <div class="demo-badge">
      <Badge position="top-left" content="8">
        <div class="child" />
      </Badge>
      <Badge position="top-right" content="8">
        <div class="child" />
      </Badge>
      <Badge position="bottom-left" content="8">
        <div class="child" />
      </Badge>
      <Badge position="bottom-right" content="8">
        <div class="child" />
      </Badge>
    </div>

    <div class="demo-badge">
      <Badge :content="20" />
      <Badge :content="20" color="#1989fa" />
      <Badge dot color="#1989fa" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "@/composables/use-route";

import Empty from "@/components/empty";
import "@/components/empty/index.less";

import Overlay from "@/components/overlay";
import "@/components/overlay/index.less";

import Badge from "@/components/badge";
import "@/components/badge/index.less";

export default defineComponent({
  name: "Home",
  components: {
    Empty,
    Overlay,
    Badge,
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
@import "~@/style/var.less";

.custom-image {
  ::v-deep(.@{prefixe}-empty__image) {
    width: 90px;
    height: 90px;
  }
}

.demo-badge {
  margin: 10px 10px;
  ::v-deep(.@{prefixe}-badge__wrapper) {
    margin-left: var(~"--@{prefixe}-padding-md");
  }

  .child {
    width: 40px;
    height: 40px;
    background: var(~"--@{prefixe}-gray-2");
    border-radius: 4px;
  }
}
</style>
