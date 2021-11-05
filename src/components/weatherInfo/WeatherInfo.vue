<template>
  <div class="w-full">
    <div v-if="error">{{ error }}</div>
    <div v-if="loading">loading</div>
    <WeatherInfoBig
      v-if="!loading && weatherInfo.current"
      :city="locationName"
      :date="weatherInfo.current.date"
      :description="weatherInfo.current.description"
      :icon="weatherInfo.current.icon"
      :temperature="convertTemperature(weatherInfo.current.temperature)"
      :minimum-temperature="
        convertTemperature(weatherInfo.current.minimumTemperature)
      "
      :maximum-temperature="
        convertTemperature(weatherInfo.current.maximumTemperature)
      "
      :sunrise="weatherInfo.current.sunrise"
      :sunset="weatherInfo.current.sunset"
      :humidity="weatherInfo.current.humidity"
      :wind-degree="weatherInfo.current.windDegree"
      :wind-direction="weatherInfo.current.windDirection"
      :wind-speed="weatherInfo.current.windSpeed"
    />

    <div
      v-if="!loading && weatherInfo.daily"
      class="flex flex-col lg:flex-row justify-center gap-2 lg:divide-y-0 divide-y-2"
    >
      <WeatherInfoSmall
        v-for="day in weatherInfo.daily"
        :key="day.date"
        :day="day.date"
        :description="day.description"
        :icon="day.icon"
        :minimum-temperature="convertTemperature(day.minimumTemperature)"
        :maximum-temperature="convertTemperature(day.maximumTemperature)"
        :wind-degree="day.windDegree"
        :wind-direction="day.windDirection"
        :wind-speed="day.windSpeed"
        :beaufort="day.beaufort"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { getWeatherForecast, convertTemperature } from "../../api/weather";
import WeatherInfoBig from "./WeatherInfoBig.vue";
import WeatherInfoSmall from "./WeatherInfoSmall.vue";

export default {
  components: { WeatherInfoBig, WeatherInfoSmall },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const weatherInfo = ref({ current: null, daily: null });
    const error = ref(null);

    watchEffect(async () => {
      if (store.getters.hasLocation) {
        try {
          loading.value = true;
          const data = await getWeatherForecast(store.getters.location);
          weatherInfo.value = data;
          loading.value = false;
        } catch (err) {
          error.value = err;
        }
      }
    });

    return {
      weatherInfo,
      loading,
      error,
      location: computed(() => store.state.location),
      locationName: computed(() => store.state.locationName),
    };
  },
  methods: {
    convertTemperature,
  },
};
</script>
