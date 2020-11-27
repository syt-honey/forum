<template>
  <div class="home">
    <nav-bar class="nav-bar"></nav-bar>
    <div class="main-container">
      <side-bar @publishTopic="publishTopic" class="side-bar"></side-bar>
      <main-content class="main-content"></main-content>
    </div>
  </div>

  <ch-dialog
    v-if="showPublishDialog"
    @hideDialog="showPublishDialog = false"
    @confirmDialog="confirmDialog"
    title="发表主题"
    confirmText="发布"
  >
    <ch-input
      v-model="topic.title"
      class="input-topic-title"
      placeholder="请输入话题名称"
    ></ch-input>
    <!--    TODO 限制输入高度-->
    <ch-input
      v-model="topic.content"
      class="input-topic-content"
      type="textarea"
      placeholder="请输入内容"
    ></ch-input>
  </ch-dialog>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import SideBar from "@/components/SideBar/SideBar";
import MainContent from "@/views/Home/Index";
import { ref } from "vue";
export default {
  name: "Index",

  components: {
    NavBar,
    SideBar,
    MainContent
  },

  setup() {
    let showPublishDialog = ref(false);
    let topic = ref({
      title: "",
      content: ""
    });
    return {
      showPublishDialog,
      topic
    };
  },

  methods: {
    publishTopic() {
      this.showPublishDialog = true;
    },
    confirmDialog() {
      // 提交表单
      this.showPublishDialog = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/index.less";
@import "./style";
</style>
