<template>
  <div class="content-container">
    <template v-if="topicList.length > 0">
      <topic-item
        v-for="(topic, index) of topicList"
        :topic-item="topic"
        :key="index"
      ></topic-item>
    </template>
    <div v-else class="placeholder">
      <img
        src="@/assets/img/nodata.png"
        alt="no-data"
        class="placeholder-img"
      />
      <span class="placeholder-text">暂无主题</span>
    </div>
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
