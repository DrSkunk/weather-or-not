<template>
  <div class="container mx-auto px-2 py-4">
    <header
      class="flex flex-wrap justify-center sm:justify-between gap-2 sm:px-0"
    >
      <LanguageSelector />
      <TemperatureScale />
    </header>
    <main class="flex flex-col justify-center items-center mt-4">
      <div class="inline-flex gap-2">
        <LocationInput />
        <BrowserLocationButton />
      </div>
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
import BrowserLocationButton from "./components/BrowserLocationButton.vue";
import { setUserLocationFromIp } from "./api/location";
import { useStore } from "vuex";

export default {
  components: {
    WeatherInfo,
    LocationInput,
    LocationMap,
    LanguageSelector,
    TemperatureScale,
    BrowserLocationButton,
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
