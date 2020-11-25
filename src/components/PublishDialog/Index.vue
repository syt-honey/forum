<template>
  <div class="dialog-mask">
    <div class="dialog-wrapper" ref="dialogWrapper">
      <div class="dialog-container">
        <div class="dialog-header">{{ title }}</div>
        <div class="dialog-body">
          <slot></slot>
        </div>
        <div class="dialog-footer">
          <div class="left i-block" @click="dialogClose">{{ cancel }}</div>
          <div class="right i-block" @click="submit">{{ confirm }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 自定义 dialog UI
  name: "PublishDialog",
  props: {
    title: {
      type: String,
      default: () => "提示"
    },
    cancel: {
      type: String,
      default: () => "取消"
    },
    confirm: {
      type: String,
      default: () => "确定"
    }
  },
  setup() {
    return {};
  },

  methods: {
    dialogClose() {
      // 关闭 dialog
    },
    submit() {
      // 提交表单
    }
  }
};
</script>

<style lang="less" scoped>
.dialog-mask {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  display: table;
}
</style>
