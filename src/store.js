import { createStore } from "vuex";

const state = {
  location: {
    longitude: null,
    latitude: null,
  },
  locationName: "",
  locale: "en-US",
};

const getters = {
  location: (state) => state.location,
  locationName: (state) => state.locationName,
  hasLocation: (state) => Object.values(state.location).some((val) => !!val),
  locale: (state) => state.locale,
};

const actions = {
  setLocation({ commit }, location) {
    commit("setLocation", location);
  },
  setLocationName({ commit }, locationName) {
    commit("setLocationName", locationName);
  },
  setLocale({ commit }, locale) {
    commit("setLocale", locale);
  },
};

const mutations = {
  setLocation: (state, location) => {
    state.location = location;
  },
  setLocationName: (state, locationName) => {
    state.locationName = locationName;
  },
  setLocale: (state, locale) => {
    state.locale = locale;
  },
};

const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

export default store;
