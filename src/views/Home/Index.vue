<template>
  <div class="content-container">
    <topic-item
      v-for="(topic, index) of topicList"
      :topic-item="topic"
      :key="index"
    ></topic-item>
    <!--      TODO 自定义上拉加载-->
  </div>
</template>

<script>
import TopicItem from "@/components/TopicItem/Index";
export default {
  name: "Home",

  components: {
    TopicItem
  },

  props: {
    topicList: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
