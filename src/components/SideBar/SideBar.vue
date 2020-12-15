<template>
  <div class="side-bar-container">
    <ch-button type="primary" class="publish-button" @click="publishTopic"
      >发表主题</ch-button
    >
    <div class="topic-container">
      <div
        class="topic-item"
        v-for="(topicItem, index) of topicList"
        :class="{ 'topic-text-selected': topicItem.isSelected }"
        :key="index"
        @click="findTopics(topicItem.type)"
      >
        {{ topicItem.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SideBar",

  setup(props, context) {
    const topicList = ref([
      {
        name: "全部主题",
        type: "all",
        isSelected: true
      },
      {
        name: "精华主题",
        type: "essence",
        isSelected: false
      },
      {
        name: "文件主题",
        type: "file",
        isSelected: false
      },
      {
        name: "图片主题",
        type: "image",
        isSelected: false
      }
    ]);

    const publishEvent = () => {
      context.emit("publish-topic");
    };
    return {
      topicList,
      publishEvent
    };
  },

  methods: {
    publishTopic() {
      // 上传父组件，发表主题
      this.publishEvent();
    },
    findTopics(type) {
      // 设置样式
      // TODO 后期改成CSS方式
      this.setSelected(type);
      // 进入到不同的主题
      this.$store.dispatch("topic/setFocusTopic", type);
    },
    setSelected(type) {
      for (const item of this.topicList) {
        item.isSelected = item.type === type;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "style.less";
</style>
