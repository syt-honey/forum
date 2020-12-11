<template>
  <div class="dialog-mask" @click.self="handleWrapperClick">
    <div class="dialog-container" ref="dialogWrapper">
      <svg-icon
        icon-class="ch-cancel"
        class="cancel-icon"
        @click="hideDialog"
      ></svg-icon>
      <div class="dialog-header">{{ title }}</div>
      <ch-border class="horizontal-line"></ch-border>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialog-footer">
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
