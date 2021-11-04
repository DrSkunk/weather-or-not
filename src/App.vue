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
    <WeatherInfo />
    <LocateUser />
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
import LocateUser from "./components/LocateUser.vue";

export default {
  components: {
    WeatherInfo,
    LocationInput,
    Map,
    LanguageSelector,
    WeatherIcon,
    LocateUser,
  },
  setup() {
    const store = useStore();
    return {
      locale: computed(() => store.state.locale),
    };
  },
};
</script>
