<template>
  <main
    :key="locale"
    class="
      container
      mx-auto
      flex flex-col
      justify-center
      items-center
      pt-8
      pb-4
    "
  >
    <LocationInput />
    <TemperatureScale class="absolute right-5 top-5" />
    <WeatherInfo />
    <LocateUser />
    <!-- <LanguageSelector /> -->
    <!-- <div class="h-96">
      <LocationMap />
    </div> -->
  </main>
</template>

<script>
import WeatherInfo from "./components/weatherInfo/WeatherInfo.vue";
import LocationInput from "./components/LocationInput.vue";
import LocationMap from "./components/LocationMap.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import LocateUser from "./components/LocateUser.vue";
import TemperatureScale from "./components/TemperatureScale.vue";

export default {
  components: {
    WeatherInfo,
    LocationInput,
    LocationMap,
    LanguageSelector,
    LocateUser,
    TemperatureScale,
  },
  setup() {
    const store = useStore();
    return {
      locale: computed(() => store.state.locale),
    };
  },
};
</script>
