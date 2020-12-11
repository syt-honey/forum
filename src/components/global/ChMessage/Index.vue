<template>
  <div
    v-show="isShow"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    class="ch-message"
    :class="[customClass]"
  >
    <div class="ch-message-container">
      <div>
        <!--        TODO 组件中无法解析-->
        <svg-icon
          :icon-class="colorMap[type] && colorMap[type].iconName"
          class="icon tip-icon"
        />
      </div>
      <p v-if="message">{{ message }}</p>
      <div v-if="showClose">
        <svg-icon
          @click="close"
          icon-class="ch-cancel"
          class="icon cancel-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, nextTick } from "vue";
export default {
  // TODO 多次渲染时颜色不会再次赋值
  name: "ChMessage",

  props: {
    message: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "success"
    },
    duration: {
      type: Number,
      default: 3000
    },
    customClass: {
      type: String,
      default: ""
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    // 弹窗主题
    const colorMap = {
      // 成功
      success: {
        bgColor: "#f0f9eb",
        borderColor: "#e1f3d8",
        color: "#67c23a",
        iconName: "ch-finished"
      },
      // 警告
      warning: {
        bgColor: "#fdf6ec",
        borderColor: "#faecd8",
        color: "#e6a23c",
        iconName: "ch-warning"
      },
      // 危险
      error: {
        bgColor: "#fef0f0",
        borderColor: "#fde2e2",
        color: "#f56c6c",
        iconName: "ch-danger"
      }
    };
    onMounted(() => {
      // 设置主题色
      nextTick(() => {
        _setMessageBg();
      });
    });

    const _setMessageBg = () => {
      document
        .getElementsByClassName("ch-message")[0]
        .style.setProperty(
          "--message-bgColor",
          colorMap[props.type] && colorMap[props.type].bgColor
        );
      document
        .getElementsByClassName("ch-message")[0]
        .style.setProperty(
          "--message-borderColor",
          colorMap[props.type] && colorMap[props.type].borderColor
        );
      document
        .getElementsByClassName("ch-message")[0]
        .style.setProperty(
          "--message-color",
          colorMap[props.type] && colorMap[props.type].color
        );
    };

    let timer = null;
    const isShow = ref(true);

    const delayClose = () => {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          _close();
        }, props.duration);
      }
    };

    // 内部方法
    const _close = () => {
      clearTimeout(timer);
      isShow.value = false;
    };

    const close = () => {
      _close();
    };

    const handleMouseEnter = () => {
      clearTimeout(timer);
    };

    const handleMouseLeave = () => {
      delayClose();
    };

    delayClose();

    return {
      colorMap,
      isShow,
      close,
      handleMouseEnter,
      handleMouseLeave
    };
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
