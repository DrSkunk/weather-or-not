<template>
  <div class="container mx-auto pt-4">
    <header class="flex just justify-between px-2 sm:px-0">
      <LanguageSelector />
      <TemperatureScale />
    </header>
    <main class="flex flex-col justify-center items-center mt-4">
      <LocationInput />
      <WeatherInfo />
      <LocationMap class="h-96 w-full mt-4" />
    </main>
  </div>
</template>

<script>
import WeatherInfo from "./components/weatherInfo/WeatherInfo.vue";
import LocationInput from "./components/LocationInput.vue";
import LocationMap from "./components/LocationMap.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
import TemperatureScale from "./components/TemperatureScale.vue";
import { setUserLocationFromIp } from "./api/location";
import { useStore } from "vuex";

export default {
  components: {
    WeatherInfo,
    LocationInput,
    LocationMap,
    LanguageSelector,
    TemperatureScale,
  },
  setup() {
    setUserLocationFromIp();
  },
  created() {
    const store = useStore();
    store.commit("initialiseStore");
  },
};
</script>
