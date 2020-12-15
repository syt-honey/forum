<template>
  <div
    v-show="visible"
    class="ch-loading-mask"
    :class="[customClass, { 'is-fullscreen': fullscreen }]"
  >
    <div class="ch-loading__wrap">
      <svg-icon icon-class="ch-loading" class="ch-loading-circle" />
      <p v-if="text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChLoading",

  props: {
    text: {
      type: String,
      default: "加载中..."
    },
    customClass: {
      type: String,
      default: ""
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
