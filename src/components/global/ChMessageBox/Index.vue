<template>
  <div v-show="isShow" class="ch-dialog-mask" @click.self="handleWrapperClick">
    <div class="ch-message-box__wrap">
      <svg-icon
        icon-class="ch-cancel"
        class="ch-cancel-icon"
        @click="hideMessageBox"
      ></svg-icon>
      <div class="ch-message-box__header">{{ title }}</div>
      <ch-border class="ch-horizontal-line"></ch-border>
      <div class="ch-message-box__body">
        <div>
          <svg-icon
            :icon-class="iconMap[type] && iconMap[type].iconName"
            class="ch-icon ch-tip-icon"
          />
        </div>
        <p v-if="message">{{ message }}</p>
      </div>
      <div class="ch-message-box__footer">
        <ch-button class="ch-cancel-btn" @click="hideMessageBox">
          {{ cancelButtonText }}
        </ch-button>
        <ch-button
          type="primary"
          class="ch-confirm-btn"
          @click="confirmMessageBox"
        >
          {{ confirmButtonText }}
        </ch-button>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, ref } from "vue";
import ChButton from "@/components/global/ChButton/Index";
import SvgIcon from "@/components/global/SvgIcon/Index";
import ChBorder from "@/components/global/ChBorder/Index";

export default {
  // 自定义 MessageBox UI
  name: "ChMessageBox",

  components: {
    ChButton,
    SvgIcon,
    ChBorder
  },

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
    },
    confirmButtonText: {
      type: String,
      default: "确认"
    },
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    type: {
      type: String,
      default: "warning"
    },
    click: {
      type: Function
    }
  },

  setup(props) {
    const isShow = ref(true);
    const { closeOnClickModal } = toRefs(props);
    const iconMap = {
      // 警告
      warning: {
        iconName: "ch-tip-warning"
      }
    };

    const hideMessageBox = () => {
      isShow.value = false;
    };

    const confirmMessageBox = () => {
      isShow.value = false;
      props.click();
    };

    const handleWrapperClick = () => {
      if (!closeOnClickModal) return;
      hideMessageBox();
    };

    return {
      iconMap,
      isShow,
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
