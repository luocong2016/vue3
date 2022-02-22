<template>
  <div>
    <button @click="handleClick(toggle)">{{ toggle }}</button>
    <div :class="$style.text">$style.text</div>
    <div :class="classes.red">classes</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, useCssModule } from 'vue';
// const css = useCssModule(); => 等价 $style
const classes = useCssModule('classes');

const color = ref<string>('red');
const handleClick = (v: string) => {
  color.value = v;
};
const toggle = computed<string>(() => (color.value === 'red' ? 'blue' : 'red'));
</script>

<style lang="less" module scoped>
.text {
  color: v-bind('color');
}
</style>

<style lang="less" module="classes">
.red {
  color: red;
}
</style>
