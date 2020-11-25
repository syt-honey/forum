<template>
  <div class="nav-bar-container">
    <div class="nav-bar-content">
      <svg-icon
        icon-class="logo"
        class-name="svg-icon-logo"
        @click="goToHome"
      />
      <div class="flex-center-item search-and-user-info">
        <div class="input-animation">
          <ch-input
            v-model="inputText"
            placeholder="搜索主题"
          ></ch-input>
          <span></span>
        </div>
        <svg-icon icon-class="search" />
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
