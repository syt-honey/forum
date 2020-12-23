<template>
  <div
    :class="
      isSpread
        ? 'topic-item-container topic-item-container-spread'
        : 'topic-item-container'
    "
  >
    <div class="content-desc">
      <div>
        <span class="title">{{ topicItem.title.trim() }}</span>
        <span class="time">{{ topicItem.createDate }}</span>
      </div>
    </div>
    <div
      :class="isSpread ? 'topic-content-spread' : 'content'"
      @click="spreadContent"
    >
      <v-md-preview
        v-if="isSpread"
        :text="topicItem.content.trim()"
      ></v-md-preview>
      <p v-else>{{ handleContent }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TopicItem",

  props: {
    topicItem: {
      type: Object,
      default: () => {}
    }
  },

  setup() {
    // 初始化 isSpread 值
    let isSpread = ref(false);
    let nowPosY = 0;

    return {
      isSpread,
      nowPosY
    };
  },

  computed: {
    handleContent() {
      // 将文本中的 markdown 字符去掉
      return this.topicItem.content.trim().replace(/>|#|##|`|\*|\||-/g, "");
    }
  },

  methods: {
    // 点击收缩内容，改变收缩状态
    spreadContent(e) {
      // 如果为用户选中事件，则不处理
      if (window.getSelection().toString()) {
        return;
      }

      if (!this.isSpread) {
        // 此时内容的状态为"收起"，记录点击时的 pageY
        this.nowPosY = e.pageY;
      } else {
        // 如果差值小于 430（文本未展开时的高度）则不滚动
        const offsetY =
          Math.abs(this.nowPosY - e.pageY) < 430 ? 0 : this.nowPosY - e.pageY;
        window.scrollBy({
          top: offsetY
        });
      }
      this.isSpread = !this.isSpread;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
