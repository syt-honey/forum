<template>
  <div class="ch-dialog-mask" @click.self="handleWrapperClick">
    <div class="ch-message-box__wrap">
      <svg-icon
        icon-class="ch-cancel"
        class="ch-cancel-icon"
        @click="hideMessageBox"
      ></svg-icon>
      <div class="ch-message-box__header">{{ title }}</div>
      <ch-border class="ch-horizontal-line"></ch-border>
      <div class="ch-message-box__body">
        {{ message }}
      </div>
      <div class="ch-message-box__footer">
        <ch-button class="ch-cancel-btn" @click="hideMessageBox">
          取消
        </ch-button>
        <ch-button
          type="primary"
          class="ch-confirm-btn"
          @click="confirmMessageBox"
        >
          确定
        </ch-button>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
export default {
  // 自定义 Dialog UI
  name: "ChMessageBox",

  props: {
    title: {
      type: String,
      default: () => "提示"
    },
    message: {
      type: String,
      default: () => "这是提示内容"
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  setup(props, context) {
    const { closeOnClickModal } = toRefs(props);
    const hideMessageBox = () => {
      context.emit("hide-message-box");
    };

    const confirmMessageBox = () => {};

    const handleWrapperClick = () => {
      if (!closeOnClickModal) return;
      hideMessageBox();
    };

    return {
      hideMessageBox,
      confirmMessageBox,
      handleWrapperClick
    };
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
