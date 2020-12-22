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
        <span class="title">{{ topicItem.title.trim() }}</span>
        <span class="time">{{ topicItem.createDate }}</span>
      </div>
    </div>
    <div
      :class="isSpread ? 'topic-content-spread' : 'content'"
      @click="spreadContent()"
    >
      <v-md-preview :text="topicItem.content.trim()"></v-md-preview>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import { formatTime } from "@/utils/common";

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

  // computed: {
  //   formatDate() {
  //     return function(value) {
  //       return formatTime(new Date(value).getTime());
  //     };
  //   }
  // },

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
