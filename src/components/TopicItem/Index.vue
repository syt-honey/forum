<template>
  <div
    :class="
      isSpread
        ? 'topic-item-container topic-item-container-spread'
        : 'topic-item-container'
    "
  >
    <div class="content-desc">
      <!--   TODO 会各自换行   -->
      <label style="font-size: 16px; ">{{ topicItem.title }}</label>
      <label style="margin-left: 10px; color: #797979;">{{
        topicItem.time
      }}</label>
    </div>
    <div
      :class="isSpread ? 'topic-content-spread' : 'content'"
      @click="spreadContent()"
    >
      <p>{{ topicItem.content }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "TopicItem",

  props: {
    topicItem: {
      type: Object,
      default: () => {}
    }
  },

  setup() {
    // 初始化 isSpread 值
    let isSpread = ref(false);

    return {
      isSpread
    };
  },

  methods: {
    // 点击收缩内容，改变收缩状态
    spreadContent() {
      this.isSpread = !this.isSpread;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
