<template>
  <button type="button" @click="$emit('click')"><slot /></button>
</template>

<script>
export default {
  // 自定义 Button UI
  name: "ChButton",
  setup() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
