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
      :pressure="weatherInfo.current.pressure"
      :wind-degree="weatherInfo.current.windDegree"
      :wind-direction="weatherInfo.current.windDirection"
      :wind-speed="weatherInfo.current.windSpeed"
      :beaufort="weatherInfo.current.beaufort"
    />
    <TitleLine v-if="!loading && weatherInfo.daily">
      {{ $t("daily") }}
    </TitleLine>
    <div
      v-if="!loading && weatherInfo.daily"
      class="
        flex flex-col
        lg:flex-row
        justify-center
        gap-2
        lg:divide-y-0
        divide-y-2
      "
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
    <TitleLine> {{ $t("historical") }} </TitleLine>
    <div
      v-if="hasLocation"
      class="
        flex flex-col
        lg:flex-row
        justify-center
        gap-2
        lg:divide-y-0
        divide-y-2
      "
    >
      <WeatherInfoHistorical
        v-for="day in previousDays"
        :key="day"
        :day="day"
        :location="location"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { subDays } from "date-fns";
import {
  getHistoricalWeatherForecast,
  getWeatherForecast,
  convertTemperature,
} from "../../api/weather";
import WeatherInfoBig from "./WeatherInfoBig.vue";
import WeatherInfoSmall from "./WeatherInfoSmall.vue";
import WeatherInfoHistorical from "./WeatherInfoHistorical.vue";
import TitleLine from "../TitleLine.vue";

export default {
  components: {
    WeatherInfoBig,
    WeatherInfoSmall,
    WeatherInfoHistorical,
    TitleLine,
  },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const weatherInfo = ref({ current: null, daily: null });
    const error = ref(null);

    watchEffect(async () => {
      if (store.getters.hasLocation) {
        try {
          loading.value = true;
          const oldData = await getHistoricalWeatherForecast(
            subDays(new Date(), 1),
            store.getters.location
          );
          console.log(oldData);
          const data = await getWeatherForecast(store.getters.location);
          weatherInfo.value = data;
          loading.value = false;
        } catch (err) {
          error.value = err;
        }
      }
    });

    const previousDays = computed(() => {
      const today = new Date();
      return [1, 2, 3, 4, 5].map((daysToSubtract) =>
        subDays(today, daysToSubtract)
      );
    });
    return {
      weatherInfo,
      loading,
      error,
      location: computed(() => store.state.location),
      locationName: computed(() => store.state.locationName),
      hasLocation: computed(() => store.getters.hasLocation),
      previousDays,
    };
  },
  methods: {
    convertTemperature,
  },
};
</script>
