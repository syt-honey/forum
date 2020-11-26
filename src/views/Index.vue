<template>
  <div class="home">
    <nav-bar class="nav-bar"></nav-bar>
    <div class="main-container">
      <side-bar @publishTopic="publishTopic" class="side-bar"></side-bar>
      <main-content class="main-content"></main-content>
    </div>
  </div>
  <!--    v-if="showPublishDialog"-->
  <ch-dialog
    @hideDialog="showPublishDialog = false"
    @confirmDialog="confirmDialog"
    title="发表主题"
    confirmText="发布"
  >
    <ch-input v-model="test" class="input-topic-title" placeholder="请输入话题名称"></ch-input>
<!--    <ch-input v-model="topic.title" class="input-topic-title" placeholder="请输入话题名称"></ch-input>-->
<!--    <ch-input v-model="topic.content" class="input-topic-content" type="textarea" placeholder="请输入内容"></ch-input>-->
  </ch-dialog>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import SideBar from "@/components/SideBar/SideBar";
import MainContent from "@/views/Home/Index";
import { ref } from "vue";
export default {
  name: "Home",
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
    let test = ref("");
    return {
      showPublishDialog,
      topic,
      test
    };
  },

  methods: {
    update (event) {
      console.log(event.target.value);
    },
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

.home {
  .wh(100%, 100%);

  .main-container {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 40px auto;

    .side-bar {
      width: 170px;
    }

    .main-content {
      .wh(calc(100% - 170px), calc(100vh - 120px));
      padding-right: 170px;
    }
  }
}

/deep/ .ch-input {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 5px;
  border: none;
}

</style>
