<template>
  <button type="button" class="ch-button" :class="[`ch-button-${type}`]">
    <slot />
  </button>
</template>

<script>
export default {
  // 自定义 Button UI
  name: "ChButton",

  props: {
    type: {
      type: String,
      default: () => "normal"
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
