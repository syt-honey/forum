<template>
  <div class="home">
    <nav-bar class="nav-bar"></nav-bar>
    <div class="main-container">
      <side-bar @publishTopic="openDialog()" class="side-bar"></side-bar>
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
          <span class="placeholder-text">暂无主题</span>
        </div>
      </template>
    </div>
    <the-footer></the-footer>
  </div>
  <!-- 组件形式 -->
  <!--  <ch-message-->
  <!--    type="success"-->
  <!--    :showClose="true"-->
  <!--    :message="messageText"-->
  <!--  ></ch-message>-->

  <ch-dialog
    v-if="showPublishDialog"
    @hideDialog="hideDialog"
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
    <template v-slot:footer>
      <ch-button class="publish-btn" @click="confirmDialog">
        确定
      </ch-button>
    </template>
  </ch-dialog>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import SideBar from "@/components/SideBar/SideBar";
import MainContent from "@/views/Home/Index";
import TheFooter from "@/components/Footer/Index";
import { ref, getCurrentInstance, onMounted } from "vue";
import { RES_CODE } from "@/utils/constant";
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
    let showPublishDialog = ref(false);
    let showMessage = ref(true);
    let messageText = ref("这是一条成功提示");
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
    const openDialog = () => {
      showPublishDialog.value = true;
    };

    const hideDialog = () => {
      // TODO 添加二次确认，点击确认后清除输入内容  topic.value.title = ""; topic.value.content = "";
      showPublishDialog.value = false;
    };

    /**
     * 点击发布主题方法
     */
    const confirmDialog = () => {
      // 以下是暂时的解决方法。
      // TODO 如何控制事件捕获/事件冒泡来阻止事件被触发两次？
      if (showPublishDialog.value) {
        showPublishDialog.value = false;
        publishTopicInterface();
      }
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
          topicList.value = res.data.list;
        })
        .catch(err => {
          ctx.$message({
            message: `获取主题失败：${err}`,
            type: "error"
          });
          loading.value = false;
        });
    };

    /**
     * 发布主题接口
     */
    const publishTopicInterface = () => {
      loading.value = true;
      const data = topic.value;
      ctx.$service
        .publishTopic({ data })
        .then(res => {
          loading.value = false;
          if (res.code === RES_CODE.SUCCESS) {
            ctx.$message({
              message: "发布成功",
              type: "success"
            });
            getTopicInterface();
          } else if (res.code === RES_CODE.FAIL) {
            ctx.$message({
              message: `发布失败：${res.msg}`,
              type: "error"
            });
          }
        })
        .catch(err => {
          ctx.$message({
            message: `发布失败：${err}`,
            type: "error"
          });
          loading.value = false;
        });
    };

    return {
      ctx,
      state,
      showPublishDialog,
      topic,
      topicList,
      hideDialog,
      getTopicInterface,
      publishTopicInterface,
      confirmDialog,
      openDialog,
      loading,
      showMessage,
      messageText
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
  },

  methods: {
    // confirmDialog1(e) {
    //   console.log(e);
    // }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/index.less";
@import "./style";
</style>
