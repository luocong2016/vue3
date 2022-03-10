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
    <!-- 基础用法 -->
    <button @click="show = true">显示遮罩</button>
    <Overlay :show="show" @click="show = false" />

    <br />
    <!-- 基础用法 -->
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

    <!-- 自定义徽标位置 -->
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

    <!-- 独立展示 -->
    <div class="demo-badge">
      <Badge :content="20" />
      <Badge :content="20" color="#1989fa" />
      <Badge dot color="#1989fa" />
    </div>

    <!-- 文字水印 -->
    <button @click="title = title === 'Bukn' ? 'Lutz' : 'Bukn'">
      {{ title === "Bukn" ? "Lutz" : "Bukn" }}
    </button>
    <button @click="rotate = (rotate + 20) % 360">Rotate({{ rotate }})</button>
    <WaterMark :content="title" :rotate="rotate">
      <div style="height: 500px; background: rgba(0, 0, 0, 0.005)" />
    </WaterMark>

    <!-- 图片水印 -->
    <WaterMark
      :height="36"
      :width="115"
      image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg"
    >
      <div style="height: 500px">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam aliquid
          perferendis, adipisci dolorum officia odio natus facere cumque iusto libero
          repellendus praesentium ipsa cupiditate iure autem eos repudiandae delectus
          totam?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo praesentium,
          aperiam numquam voluptatibus asperiores odio? Doloribus saepe, eligendi facere
          inventore culpa, exercitationem explicabo earum laborum deleniti reiciendis
          deserunt accusantium ullam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptas
          numquam impedit architecto facilis aliquam at assumenda, nostrum explicabo
          accusantium ipsam error provident voluptate molestias magnam quisquam excepturi
          illum sit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, accusantium
          quo corporis fugit possimus quaerat ad consequatur veniam voluptatum ut cumque
          illo beatae. Magni assumenda eligendi itaque eum voluptate non!
        </p>
      </div>
    </WaterMark>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Badge, Empty, Overlay, WaterMark } from "@/components";

export default defineComponent({
  name: "Home",

  components: { Badge, Empty, Overlay, WaterMark },

  setup() {
    const show = ref(false);

    const title = ref("Lutz");
    const rotate = ref(-22);

    return {
      rotate,
      title,
      show,
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
