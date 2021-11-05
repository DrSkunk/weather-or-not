import { createStore } from "vuex";
import temperatureScale from "./api/temperatureScale";

const state = {
  location: {
    longitude: null,
    latitude: null,
  },
  locationName: "",
  locale: "en",
  temperatureScale: temperatureScale.CELSIUS,
};

const getters = {
  location: (state) => state.location,
  locationName: (state) => state.locationName,
  hasLocation: (state) => Object.values(state.location).some((val) => !!val),
};

const actions = {
  setLocation({ commit }, location) {
    commit("setLocation", location);
  },
  setLocationName({ commit }, locationName) {
    commit("setLocationName", locationName);
  },
  setTemperatureScale({ commit }, temperatureScale) {
    commit("setTemperatureScale", temperatureScale);
  },
};

const mutations = {
  setLocation: (state, location) => {
    state.location = location;
  },
  setLocationName: (state, locationName) => {
    state.locationName = locationName;
  },
  setTemperatureScale: (state, temperatureScale) => {
    state.temperatureScale = temperatureScale;
  },
};

const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

export default store;
