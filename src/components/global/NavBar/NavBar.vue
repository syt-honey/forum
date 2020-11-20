<template>
  <div class="nav-bar-container">
    <div class="avatar-box">
      <img :src="getLogoSrc" alt="logo" />
    </div>
    <div class="search-and-user-info">
      <label>
        <input type="text" placeholder="搜索主题" />
      </label>
      <!--      <svg-icon icon-class="user" />-->
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },

  computed: {
    getLogoSrc() {
      return require("@/assets/img/logo.jpg");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/index.less";
@import "./style.less";
</style>
