<template>
  <div
    v-show="isShow"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    class="ch-message"
    :class="[customClass, `ch-message--${type}`]"
  >
    <div class="ch-message-container">
      <div>
        <svg-icon
          :icon-class="iconMap[type] && iconMap[type].iconName"
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
import { ref } from "vue";
import SvgIcon from "@/components/global/SvgIcon/Index";
export default {
  name: "ChMessage",

  components: {
    SvgIcon
  },

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
    const iconMap = {
      // 成功
      success: {
        iconName: "ch-finished"
      },
      // 警告
      warning: {
        iconName: "ch-warning"
      },
      // 危险
      error: {
        iconName: "ch-danger"
      }
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
      iconMap,
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
