<template>
  <WeatherInfoSmall
    v-if="!loading && !error && forecast"
    :day="forecast.date"
    :description="forecast.description"
    :icon="forecast.icon"
    :wind-degree="forecast.windDegree"
    :wind-direction="forecast.windDirection"
    :wind-speed="forecast.windSpeed"
    :beaufort="forecast.beaufort"
  />
  <div v-if="error">{{ error }}</div>
  <div
    v-if="loading"
    class="w-full h-20 lg:w-36 lg:h-72 flex justify-center items-center"
  >
    loading
  </div>
</template>

<script>
import { onMounted } from "vue";
import { ref } from "@vue/reactivity";
import { getHistoricalWeatherForecast } from "../../api/weather";
import WeatherInfoSmall from "./WeatherInfoSmall.vue";

export default {
  components: {
    WeatherInfoSmall,
  },
  props: {
    day: {
      type: Date,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const loading = new ref(true);
    const error = new ref(null);
    const forecast = new ref(null);

    onMounted(async () => {
      const { day, location } = props;
      try {
        const data = await getHistoricalWeatherForecast(day, location);
        forecast.value = data;
      } catch (err) {
        error.value = err;
      }
      loading.value = false;
    });

    return {
      loading,
      error,
      forecast,
    };
  },
};
</script>
