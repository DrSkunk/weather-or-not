<template>
  <main
    class="
      container
      mx-auto
      flex flex-col
      justify-center
      items-center
      pt-8
      pb-4
      stroke-black stroke-2
    "
    :key="locale"
  >
    <LocationInput />
    <WeatherIcon icon="01d" description="clear sky" />
    <WeatherInfo />
    <!-- <LanguageSelector /> -->
    <!-- <div class="h-96">
      <Map />
    </div> -->
  </main>
</template>

<script>
import WeatherInfo from "./components/WeatherInfo.vue";
import LocationInput from "./components/LocationInput.vue";
import Map from "./components/Map.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import WeatherIcon from "./components/WeatherIcon.vue";

export default {
  setup() {
    const store = useStore();
    return {
      locale: computed(() => store.state.locale),
    };
  },
  components: {
    WeatherInfo,
    LocationInput,
    Map,
    LanguageSelector,
    WeatherIcon,
  },
};
</script>
