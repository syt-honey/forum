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
      @keydown="publishByEnterKey"
    ></ch-input>
    <template v-slot:footer>
      <ch-button class="publish-btn" type="primary" @click="confirmDialog">
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

    /**
     * hide: 是否是点击空白区域触发的事件。如果是点击空白区域，则 hide 为 true
     */
    const hideDialog = hide => {
      // TODO 需要使用 promise 的形式实现
      if ((!topic.value.title && !topic.value.content) || hide) {
        // 没有内容或 hide 为真时不做判断
        showPublishDialog.value = false;
      } else {
        ctx.$messageBox("关闭后将不保存已输入的内容", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          click: () => {
            // TODO 会默认执行两遍
            if (showPublishDialog.value) {
              topic.value.title = "";
              topic.value.content = "";
              showPublishDialog.value = false;
            }
          }
        });
      }
    };

    const publishByEnterKey = e => {
      // 按下 ctrl/command + Enter 提交
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        confirmDialog();
        // 阻止默认事件
        e.preventDefault();
      }
    };

    /**
     * 点击发布主题方法
     */
    const confirmDialog = () => {
      // TODO 发布后清空内容
      // 以下是暂时的解决方法。
      // TODO 如何控制事件捕获/事件冒泡来阻止事件被触发两次？
      if (showPublishDialog.value) {
        if (!topic.value.title || !topic.value.content) {
          ctx.$message({
            message: "主题名称和内容不为空",
            type: "error",
            duration: 1000
          });
        } else {
          showPublishDialog.value = false;
          publishTopicInterface();
        }
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
          if (res) {
            ctx.$message({
              message: "发布成功",
              type: "success"
            });
            getTopicInterface();
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
      publishByEnterKey,
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
