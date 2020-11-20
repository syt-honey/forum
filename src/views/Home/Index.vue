<template>
  <div class="home">
    <nav-bar class="nav-bar"></nav-bar>
    <div class="main-container">
      <side-bar class="side-bar"></side-bar>
      <main-content class="main-content"></main-content>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import SideBar from "@/components/SideBar/SideBar";
import MainContent from "@/views/Home/Main";
export default {
  name: "Home",
  components: {
    NavBar,
    SideBar,
    MainContent
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/index.less";
@import "./style.less";
</style>
