<template>
  <div
    :class="
      isSpread
        ? 'topic-item-container topic-item-container-spread'
        : 'topic-item-container'
    "
  >
    <div class="content-desc">
      <div>
        <span style="font-size: 16px; ">{{ topicItem.title }}</span>
        <span style="font-size: 14px; margin-left: 10px; color: #797979;">{{
          formatDate(topicItem.createDate)
        }}</span>
      </div>
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
import dayjs from "dayjs";
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

  computed: {
    formatDate() {
      return function(value) {
        // TODO 添加规则
        return dayjs(value).format("MM月DD日");
      };
    }
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
