<template>
  <div class="nav-bar-container">
    <div class="nav-bar-content">
      <div class="avatar-box">
        <img :src="getLogoSrc" alt="logo" @click="goToHome" />
      </div>
      <div class="flex-center-item search-and-user-info">
        <label>
          <input v-model="inputText" type="text" placeholder="搜索主题" />
        </label>
        <svg-icon style="margin-left: 10px;" :icon-class="user.icon" />
        <label style="margin-left: 10px;">{{ user.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      user: {
        name: "Leooel",
        icon: "user"
      },
      inputText: ""
    };
  },

  computed: {
    getLogoSrc() {
      return require("@/assets/img/logo.jpg");
    }
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
