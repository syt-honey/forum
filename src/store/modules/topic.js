// import { ref } from "vue";
const state = {
  // 当前选中的主题
  currentFocusTopic: "all"
};

const mutations = {
  SET_FOCUS_TOPIC: (state, topic) => {
    state.currentFocusTopic = topic;
  }
};

const actions = {
  setFocusTopic: ({ commit }, topic) => {
    return new Promise(() => {
      commit("SET_FOCUS_TOPIC", topic);
    });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
