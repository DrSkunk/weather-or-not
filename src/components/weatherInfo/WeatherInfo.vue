<template>
  <div>
    <div v-if="loading">loading</div>
    <WeatherInfoBig
      v-if="!loading && weatherInfo.current"
      :date="weatherInfo.current.date"
      :description="weatherInfo.current.description"
      :icon="weatherInfo.current.icon"
      :temperature="weatherInfo.current.temperature"
      :minimum-temperature="weatherInfo.current.minimumTemperature"
      :maximum-temperature="weatherInfo.current.maximumTemperature"
      :sunrise="weatherInfo.current.sunrise"
      :sunset="weatherInfo.current.sunset"
      :humidity="weatherInfo.current.humidity"
      :wind-degree="weatherInfo.current.windDegree"
      :wind-direction="weatherInfo.current.windDirection"
      :wind-speed="weatherInfo.current.windSpeed"
    />

    <div
      v-if="!loading && weatherInfo.daily"
      class="flex flex-col md:flex-row gap-2 md:divide-y-0 divide-y-2"
    >
      <WeatherInfoSmall
        v-for="day in weatherInfo.daily"
        :key="day.date"
        :day="day.date"
        :description="day.description"
        :icon="day.icon"
        :minimum-temperature="day.minimumTemperature"
        :maximum-temperature="day.maximumTemperature"
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
import { oneCall } from "api/weather";
import WeatherInfoBig from "components/WeatherInfoBig.vue";
import WeatherInfoSmall from "components/WeatherInfoSmall.vue";

export default {
  components: { WeatherInfoBig, WeatherInfoSmall },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const weatherInfo = ref({ current: null, daily: null });

    watchEffect(async () => {
      if (store.getters.hasLocation) {
        loading.value = true;
        const data = await oneCall(store.getters.location);
        weatherInfo.value = data;
        loading.value = false;
      }
    });

    return {
      weatherInfo,
      loading,
      location: computed(() => store.state.location),
    };
  },
};
</script>
