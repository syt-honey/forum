<template>
  <div class="footer">
    <div class="copyright">
      {{ copyright }}
      <svg-icon icon-class="love" class="footer-icon"></svg-icon>
    </div>
    <div class="contact">
      <span>contact us: </span>
      <svg-icon
        icon-class="github"
        class="footer-icon github"
        @click="contactUs"
      ></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",

  setup() {
    const copyright = "©️ 2020, made by H&L";
    const contactLink = "https://github.com/syt-honey/forum";
    const contactUs = () => {
      window.open(contactLink);
    };
    return {
      copyright,
      contactLink,
      contactUs
    };
  }
};
</script>
<style lang="less" scoped>
@import "./style";
</style>
