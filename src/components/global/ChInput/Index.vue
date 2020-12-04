<template>
  <!--  TODO 控制输入字数-->
  <!--      可以通过父组件传入参数的方式修改该变量名称-->
  <div>
    <input
      v-if="type === 'text'"
      class="ch-input__input"
      :value="modelValue"
      @input="handleInput"
      :type="type"
      :placeholder="placeholder"
    />

    <textarea
      v-if="type === 'textarea'"
      class="ch-input__area"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
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
    }
  },

  setup(props, context) {
    // 处理输入
    const inputEvent = val => {
      context.emit("update:modelValue", val);
    };
    return {
      inputEvent
    };
  },

  methods: {
    handleInput(event) {
      this.inputEvent(event.target.value);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
