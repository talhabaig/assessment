import { createStore } from 'vuex';

export interface State {
  count: number;
}

export default createStore<State>({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },
  },
});
