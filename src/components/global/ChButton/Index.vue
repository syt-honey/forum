<template>
  <button type="button" @click="handleClick"><slot /></button>
</template>

<script>
export default {
  // 自定义 Button UI
  name: "ChButton",

  setup(props, context) {
    const handleClick = e => {
      context.emit("click", e);
    };
    return {
      handleClick
    };
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
