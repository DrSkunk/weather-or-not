<template>
  <div>
    <!-- <pre class="text-left">
    {{ JSON.stringify(weatherInfo.daily[0], null, 8) }}
    </pre> -->
    <div v-if="!weatherInfo">Loading</div>
    <div
      v-else
      class="
        grid grid-cols-1
        sm:grid-cols-7
        gap-2
        bg-gray-300
        sm:divide-y-0
        divide-y-2
        rotate-[360deg]
      "
    >
      <WeatherInfoSmall
        v-for="day in weatherInfo.daily"
        :day="new Date(day.dt * 1000)"
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
import { oneCall } from "../api/weather";
import WeatherIcon from "./WeatherIcon.vue";
import WeatherInfoBig from "./WeatherInfoBig.vue";
import WeatherInfoSmall from "./WeatherInfoSmall.vue";

export default {
  data() {
    return {
      posts: [],
      errors: [],
      weatherInfo: undefined,
    };
  },
  async created() {
    try {
      this.weatherInfo = await oneCall();
    } catch (e) {
      this.errors.push(e);
    }
  },
  components: { WeatherIcon, WeatherInfoBig, WeatherInfoSmall },
};
</script>
