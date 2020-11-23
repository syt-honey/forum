<template>
  <div class="nav-bar-container">
    <div class="nav-bar-content">
      <svg-icon icon-class="logo" class-name="svg-icon-logo" />
      <div class="flex-center-item search-and-user-info">
<!--        TODO 先自定义UI，之后再考虑写UI库-->
        <div class="flex-center-item" style="position: relative;">
          <div class="input-animation">
            <input v-model="inputText" type="text" placeholder="搜索主题" />
            <span></span>
          </div>
          <svg-icon icon-class="search" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "NavBar",
  setup() {
    let inputText = ref("");

    return {
      user: {
        name: "Leooel",
        icon: "user"
      },
      inputText
    };
  },

  methods: {
    goToHome() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/index.less";
@import "style.less";
</style>
