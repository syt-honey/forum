<template>
  <div class="topic-item-container">
    <div class="content-desc">
      <label style="font-size: 16px;">{{ topicItem.title }}</label>
      <div>
        <span class="tag">{{ topicItem.tag }}</span>
        <label style="margin-left: 10px; color: #797979;">{{
          topicItem.time
        }}</label>
      </div>
    </div>
    <div :class="isSpread ? 'topic-content-spread' : 'content'">
      <p>{{ topicItem.content }}</p>
    </div>
    <div @click="spreadContent" class="spread topic-spread">
      {{ isSpread ? "点击收起" : "点击展开" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicItem",
  props: {
    topicItem: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      isSpread: false
    };
  },

  methods: {
    // 点击收缩内容
    spreadContent() {
      this.isSpread = !this.isSpread;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
