<template>
  <div class="home">
    <nav-bar class="nav-bar"></nav-bar>
    <div class="main-container">
      <side-bar @publishTopic="publishTopic" class="side-bar"></side-bar>
      <template v-if="loading">
        <!--    TODO 实现 loading 指令-->
        <ch-loading :visible="loading"></ch-loading>
      </template>
      <template v-else>
        <main-content
          v-if="topicList.length > 0"
          :topic-list="topicList"
          class="main-content"
        ></main-content>
        <div v-else class="placeholder">
          <img
            src="@/assets/img/nodata.png"
            alt="no-data"
            class="placeholder-img"
          />
          <span class="placeholder-text">留下你的想法～</span>
        </div>
      </template>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import SideBar from "@/components/SideBar/SideBar";
import MainContent from "@/views/Home/Index";
import TheFooter from "@/components/Footer/Index";
import { ref, getCurrentInstance, onMounted } from "vue";
import { mapState } from "vuex";
export default {
  name: "Index",

  components: {
    NavBar,
    SideBar,
    MainContent,
    TheFooter
  },

  setup() {
    const ctx = getCurrentInstance().appContext.config.globalProperties;
    let topic = ref({
      title: "",
      content: ""
    });
    let topicList = ref([]);
    let loading = ref(false);
    let state = ref({
      currentFocusTopic: ctx.$store._state.data.topic.currentFocusTopic
    });

    onMounted(function() {
      getTopicInterface();
    });

    /**
     * 打开主题发布弹窗
     */
    const publishTopic = () => {
      ctx.$router.push("/publish");
    };

    /**
     * 获取主题接口
     */
    const getTopicInterface = () => {
      loading.value = true;
      const data = {
        type:
          state.value.currentFocusTopic === "all"
            ? ""
            : state.value.currentFocusTopic
      };
      ctx.$service
        .getTopic({ data })
        .then(res => {
          loading.value = false;
          if (res) {
            topicList.value = res.data.list;
          }
        })
        .catch(err => {
          ctx.$message({
            message: `获取主题失败：${err}`,
            type: "error"
          });
          loading.value = false;
        });
    };

    return {
      ctx,
      state,
      topicList,
      topic,
      loading,
      getTopicInterface,
      publishTopic
    };
  },

  computed: {
    ...mapState("topic", ["currentFocusTopic"])
  },

  watch: {
    currentFocusTopic(value) {
      this.state.currentFocusTopic = value;
      this.getTopicInterface();
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/index.less";
@import "./style";
</style>
