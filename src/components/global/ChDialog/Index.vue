<template>
  <div class="dialog-mask">
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
export default {
  // 自定义 Dialog UI
  name: "ChDialog",

  props: {
    title: {
      type: String,
      default: () => "提示"
    }
  },

  setup(props, context) {
    const hideDialog = () => {
      context.emit("hide-dialog");
    };
    return {
      hideDialog
    };
  },

  methods: {
    dialogClose() {
      // 关闭 dialog
      this.hideDialog();
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
