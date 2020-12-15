<template>
  <div class="ch-dialog-mask" @click.self="handleWrapperClick">
    <div class="ch-dialog__wrapper" ref="dialogWrapper">
      <svg-icon
        icon-class="ch-cancel"
        class="ch-cancel-icon"
        @click="hideDialog"
      ></svg-icon>
      <div class="ch-dialog__header">{{ title }}</div>
      <ch-border class="ch-horizontal-line"></ch-border>
      <div class="ch-dialog__body">
        <slot></slot>
      </div>
      <div class="ch-dialog__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
export default {
  // 自定义 Dialog UI
  name: "ChDialog",

  props: {
    title: {
      type: String,
      default: () => "提示"
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },

  setup(props, context) {
    const { closeOnClickModal } = toRefs(props);
    const hideDialog = () => {
      context.emit("hide-dialog");
    };
    const handleWrapperClick = () => {
      if (!closeOnClickModal) return;
      hideDialog();
    };
    return {
      hideDialog,
      handleWrapperClick
    };
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
