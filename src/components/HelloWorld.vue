<template>
  <div>
    <!-- <pre class="text-left">
    {{ JSON.stringify(weatherInfo.daily[0], null, 8) }}
    </pre> -->
    <!-- <img
      v-bind:src="
        'https://openweathermap.org/img/wn/' +
        weatherInfo.current.weather[0].icon +
        '@2x.png'
      "
      v-bind:alt="weatherInfo.current.weather[0].description"
    /> -->
    <!-- <div>{{weatherInfo}}</div> -->
    <!-- <WeatherIcon
      :icon="weatherInfo.current.weather[0].icon"
      :description="weatherInfo.current.weather[0].description"
    /> -->
    <!-- <WeatherInfoBig /> -->
    <div
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
        :main="day.weather[0].main"
        :icon="day.weather[0].icon"
        :minimumTemperature="day.temp.min"
        :maximumTemperature="day.temp.max"
        :windDegree="day.wind_deg"
        :windSpeed="day.wind_speed"
      />
      <!-- <WeatherInfoSmall day="new Date()" />
      <WeatherInfoSmall day="new Date()" /> -->
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
      weatherInfo: null,
    };
  },
  // Fetches posts when the component is created.
  async created() {
    // navigator.geolocation.getCurrentPosition((pos) => {
    //   console.log(pos);
    //   this.location = pos;
    // });
    try {
      this.weatherInfo = await oneCall();
    } catch (e) {
      this.errors.push(e);
    }
  },
  components: { WeatherIcon, WeatherInfoBig, WeatherInfoSmall },
};
</script>
