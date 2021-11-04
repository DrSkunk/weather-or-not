<template>
  <div>
    <!-- <div class="h-64">
      <div v-if="loading">loading</div>
      <WeatherInfoBig
        v-if="!loading && weatherInfo.current"
        :date="weatherInfo.current.date"
        :description="weatherInfo.current.description"
        :icon="weatherInfo.current.icon"
        :temperature="weatherInfo.current.temperature"
        :minimumTemperature="weatherInfo.current.minimumTemperature"
        :maximumTemperature="weatherInfo.current.maximumTemperature"
        :sunrise="weatherInfo.current.sunrise"
        :sunset="weatherInfo.current.sunset"
        :humidity="weatherInfo.current.humidity"
        :windDegree="weatherInfo.current.windDegree"
        :windSpeed="weatherInfo.current.windSpeed"
      />
    </div> -->

    <div
      v-if="!loading && weatherInfo.daily"
      class="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:divide-y-0 divide-y-2"
    >
      <WeatherInfoSmall
        v-for="day in weatherInfo.daily"
        :day="day.date"
        :description="day.weather[0].description"
        :icon="day.weather[0].icon"
        :minimumTemperature="day.temp.min"
        :maximumTemperature="day.temp.max"
        :windDegree="day.wind_deg"
        :windSpeed="day.wind_speed"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { oneCall } from "../api/weather";
import WeatherIcon from "./WeatherIcon.vue";
import WeatherInfoBig from "./WeatherInfoBig.vue";
import WeatherInfoSmall from "./WeatherInfoSmall.vue";

export default {
  setup() {
    const store = useStore();
    const loading = ref(false);
    const weatherInfo = ref({ current: null, daily: null });

    watchEffect(async () => {
      if (store.getters.hasLocation) {
        loading.value = true;
        const data = await oneCall(store.getters.location);
        weatherInfo.value = data;
        console.log(data);
        console.log(weatherInfo.value.current);
        loading.value = false;
      }
    });

    return {
      weatherInfo,
      loading,
      location: computed(() => store.state.location),
    };
  },
  components: { WeatherIcon, WeatherInfoBig, WeatherInfoSmall },
};
</script>
