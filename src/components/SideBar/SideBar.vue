<template>
  <div class="side-bar-container">
    <ch-button class="publish-button" @click="publishTopic">发表主题</ch-button>
    <div class="topic-container">
      <div
        class="topic-item"
        v-for="(topic, index) of topicList"
        :key="index"
        @click="findTopics(topic)"
      >
        <!--        <svg-icon-->
        <!--          class-name="svg-icon-topic"-->
        <!--          :icon-class="iconList[index]"-->
        <!--        ></svg-icon>-->
        <span>{{ topic }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  setup(props, context) {
    const publishEvent = () => {
      context.emit("publish-topic");
    };
    return {
      topicList: ["全部主题", "精华主题", "文件主题", "图片主题"],
      iconList: ["all-topics", "essence-topic", "file-topic", "image-topic"],
      publishEvent
    };
  },

  methods: {
    publishTopic() {
      // 上传父组件，发表主题
      this.publishEvent();
    },
    findTopics(topic) {
      // 进入到不同的主题
      console.log(topic);
    }
  }
};
</script>

<style lang="less" scoped>
@import "style.less";
</style>
