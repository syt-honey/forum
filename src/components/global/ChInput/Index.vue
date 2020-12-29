<template>
  <!--  TODO 控制输入字数-->
  <!--      可以通过父组件传入参数的方式修改该变量名称-->
  <div class="ch-input__wrapper">
    <input
      v-if="type === 'text'"
      ref="inputRef"
      class="ch-input--input"
      :value="modelValue"
      @input="handleInput"
      :type="type"
      :placeholder="placeholder"
    />

    <textarea
      v-if="type === 'textarea'"
      class="ch-input--area"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
    />
    <svg-icon
      v-if="hasSearch"
      icon-class="ch-search"
      class-name="ch-search--logo"
      @click="handleInput"
    />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  // 自定义 Input UI
  name: "ChInput",

  props: {
    modelValue: {
      type: [String, Number],
      default: () => ""
    },
    placeholder: {
      type: String,
      default: () => "请输入"
    },
    type: {
      type: String,
      default: () => "text"
    },
    hasSearch: {
      type: Boolean,
      default: () => false
    }
  },

  setup(props, context) {
    let inputRef = ref(null);

    // 处理输入
    const inputEvent = val => {
      context.emit("update:modelValue", val);
    };

    const handleInput = e => {
      inputRef.value.focus();
      inputEvent(e.target.value);
    };

    return {
      inputEvent,
      handleInput,
      inputRef
    };
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
