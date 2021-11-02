import { createStore } from "vuex";

const state = {
  location: {
    longitude: 30,
    latitude: 50,
    accuracy: 15,
  },
  count: 0,
  history: [],
};
const limit = 5;
const getters = {
  location: (state) => state.location,
  count: (state) => state.count,
  recentHistory: (state) => {
    const end = state.history.length;
    const begin = end - limit < 0 ? 0 : end - limit;
    return state.history.slice(begin, end).join(", ");
  },
};

const actions = {
  setLocation({ commit }, location) {
    commit("setLocation", location);
  },
  increment: ({ commit }) => {
    commit("increment");
  },
  decrement: ({ commit }) => {
    commit("decrement");
  },

  incrementIfOdd: ({ commit, state }) => {
    if ((state.count + 1) % 2 === 0) {
      commit("increment");
    }
  },

  incrementAsync: ({ commit }) => {
    setTimeout(() => {
      commit("increment");
    }, 1000);
  },
};

const mutations = {
  setLocation: (state, location) => {
    state.location = location;
  },
  increment: (state) => {
    state.count++;
    state.history.push("increment");
  },

  decrement: (state) => {
    state.count--;
    state.history.push("decrement");
  },
};

const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

export default store;
