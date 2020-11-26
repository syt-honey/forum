import { createStore } from "vuex";

const state = {
  isSpread: false
};

const mutations = {
  SET_SPREAD: ({ state }, isSpread) => {
    state.isSpread = isSpread;
  }
};

export default createStore({
  state,
  mutations,
  actions: {},
  modules: {}
});
