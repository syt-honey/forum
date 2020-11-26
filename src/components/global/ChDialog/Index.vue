<template>
  <div class="dialog-mask">
    <div class="dialog-container" ref="dialogWrapper">
      <svg-icon
        icon-class="cancel"
        class="cancel-icon"
        @click="hideDialog"
      ></svg-icon>
      <div class="dialog-header">{{ title }}</div>
      <ch-border class="horizontal-line"></ch-border>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <ch-button class="publish-btn" @click="submit">{{
          confirmText
        }}</ch-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 自定义 Dialog UI
  name: "ChDialog",

  props: {
    title: {
      type: String,
      default: () => "提示"
    },
    cancelText: {
      type: String,
      default: () => "取消"
    },
    confirmText: {
      type: String,
      default: () => "确定"
    }
  },

  setup(props, context) {
    const hideDialog = () => {
      context.emit("hide-dialog");
    };
    const confirmDialog = () => {
      context.emit("confirm-dialog");
    };
    return {
      hideDialog,
      confirmDialog
    };
  },

  methods: {
    dialogClose() {
      // 关闭 dialog
      this.hideDialog();
    },
    submit() {
      // 提交表单
      this.confirmDialog();
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
