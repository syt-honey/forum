<template>
  <div class="side-bar-container">
    <button class="publish-button" @click="publishTopic">发表主题</button>
    <div class="topic-container">
      <div
        class="topic-item"
        v-for="(topic, index) of topicList"
        :key="index"
        @click="findTopics(topic)"
      >
        <svg-icon
          class-name="svg-icon-topic"
          :icon-class="iconList[index]"
        ></svg-icon>
        <span style="margin-left: 10px;">{{ topic }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  setup() {
    return {
      topicList: ["全部主题", "精华主题", "文件主题", "图片主题"],
      iconList: ["all-topics", "essence-topic", "file-topic", "image-topic"]
    };
  },

  methods: {
    publishTopic() {
      // 发表主题
      this.$router.push({ path: "/publish" });
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
