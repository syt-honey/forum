<template>
  <div class="mk-header">
    <ch-input
      placeholder="请输入标题"
      class="mk-title"
      v-model="title"
    ></ch-input>
  </div>
  <v-md-editor
    v-model="content"
    class="mk-content"
    @copy-code-success="handleCopyCodeSuccess"
    left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link code image | save"
    :disabled-menus="[]"
    @save="saveContent"
    @upload-image="handleUploadImage"
  ></v-md-editor>
  <ch-button type="primary" class="mk-pub-btn" @click="publishTopicInterface"
    >发布主题</ch-button
  >
  <!--  <ch-button type="primary" class="mk-cancel-btn" @click="saveContent"-->
  <!--    >保存</ch-button-->
  <!--  >-->
  <ch-loading :visible="loading"></ch-loading>
</template>

<script>
import { getCurrentInstance } from "vue";
import { ref } from "vue";
// import axios from "axios";
import { addItem, getItem, clearItem } from "@/utils/localStorage";

export default {
  name: "Edit",

  setup() {
    const ctx = getCurrentInstance().appContext.config.globalProperties;
    let loading = ref(false);

    // 根据 localStorage 中的内容初始化 title 和 content
    const content = getItem("content") ? ref(getItem("content")) : ref("");
    const title = getItem("title") ? ref(getItem("title")) : ref("无标题");

    const handleCopyCodeSuccess = () => {
      ctx.$message({
        message: "复制成功",
        type: "success",
        duration: 1000
      });
    };

    /**
     * 保存
     */
    const saveContent = () => {
      addItem("content", content.value);
      addItem("title", title.value);
      ctx.$message({
        message: "保存成功",
        type: "success",
        duration: 1000
      });
    };

    /**
     * 发布主题接口
     */
    const publishTopicInterface = () => {
      if (!title.value || !content.value) {
        ctx.$message({
          message: "主题名称和内容不为空",
          type: "error",
          duration: 1000
        });
      } else {
        // TODO 快捷键发布
        // TODO 发布主题需要二次确认吗？
        // 发布主题
        const data = {
          title: title.value,
          content: content.value
        };
        loading.value = true;
        ctx.$service
          .publishTopic({ data })
          .then(res => {
            loading.value = false;
            if (res) {
              ctx.$message({
                message: "发布成功",
                type: "success"
              });
              // 发布成功后清空缓存
              clearItem();
              ctx.$router.push("/");
            }
          })
          .catch(err => {
            ctx.$message({
              message: `发布失败：${err}`,
              type: "error"
            });
            loading.value = false;
          });
      }
    };

    const handleUploadImage = () => {
      // let formData = new FormData();
      // formData.append("file", files[0]);
      // axios.post("/api/file/upload", formData).then(res => {
      //   console.log(res);
      // });
      ctx.$message({
        message: "该功能暂未开放～",
        type: "warning"
      });
    };

    return {
      content,
      title,
      loading,
      handleUploadImage,
      publishTopicInterface,
      saveContent,
      handleCopyCodeSuccess
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/index.less";
@import "./style";
</style>
