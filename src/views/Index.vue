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
import MainContent from "@/views/Home/Index";
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
</style>
