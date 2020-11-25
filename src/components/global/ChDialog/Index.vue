<template>
  <div class="dialog-mask">
    <div class="dialog-container" ref="dialogWrapper">
      <div class="dialog-header">{{ title }}</div>
      <div class="border"></div>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <ch-button class="publish-btn" @click="submit">{{ confirmText }}</ch-button>
      </div>
    </div>
  </div>
</template>

<script>
import ChButton from "@/components/global/ChButton/Index";
export default {
  // 自定义 Dialog UI
  name: "ChDialog",
  components: { ChButton },
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
.border {
  border-bottom: 1px solid #f5f7ff;
  margin: 0 20px;
}
.dialog-mask {
  position: fixed;
  width: 70%;
  left: 50%;
  bottom: 2px;
  transform: translateX(-50%);
  z-index: 99;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  .dialog-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    .dialog-header {
      padding: 20px 20px 10px;
      line-height: 24px;
      font-size: 18px;
    }

    .dialog-body {
      display: flex;
      flex-direction: column;
      padding: 10px 20px;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;

      .publish-btn {
        width: 80px;
        height: 25px;
      }
    }
  }
}
</style>
