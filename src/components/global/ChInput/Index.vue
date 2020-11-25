<template>
  <!--      可以通过父组件传入参数的方式修改该变量名称-->
  <template v-if="type === 'text'">
    <input
        class="ch-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
        :placeholder="placeholder"
    >
  </template>
  <template v-if="type === 'textarea'">
    <textarea
        class="ch-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
        :placeholder="placeholder"
    />
  </template>
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

  setup() {}
};
</script>

<style lang="less" scoped>
@import "./style";
</style>
