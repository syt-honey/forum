<template>
  <!--      可以通过父组件传入参数的方式修改该变量名称-->
  <template v-if="type === 'text'">
    <input
        class="ch-input"
        :value="modelValue"
        @input="handleInput"
        :type="type"
        :placeholder="placeholder"
    >
  </template>
<!--  <template v-if="type === 'textarea'">-->
<!--    <textarea-->
<!--        class="ch-input"-->
<!--        :value="modelValue"-->
<!--        @input="handleInput"-->
<!--        :type="type"-->
<!--        :placeholder="placeholder"-->
<!--    />-->
<!--  </template>-->
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
    const inputEvent = (val) => {
      context.emit('update:modelValue', val);
    }
    return {
      inputEvent
    }
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
