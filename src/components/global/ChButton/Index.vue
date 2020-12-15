<template>
  <button
    type="button"
    class="ch-button"
    :class="[`ch-button-${type}`]"
    @click="handleClick"
  >
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
  },

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
