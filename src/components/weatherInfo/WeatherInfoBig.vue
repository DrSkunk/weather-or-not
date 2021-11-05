<template>
  <div class="flex flex-wrap justify-center gap-4 m-2">
    <div>
      <WeatherIcon class="w-32" :icon="icon" :description="description" />
    </div>
    <div class="flex flex-col text-left">
      <!-- <div>vr 29 okt</div> -->
      <div class="text-xl">{{ $d(date, "long") }}</div>
      <div class="text-7xl">{{ temperature }}°</div>
      <div v-text="description" />
    </div>
    <div class="grid grid-cols-2">
      <div>{{ $t("max") }}</div>
      <div>{{ maximumTemperature }}°</div>
      <div>{{ $t("min") }}</div>
      <div>{{ minimumTemperature }}°</div>
      <WindDirection class="h-12" :wind-degree="windDegree" />
      <div v-text="windDirection" />
    </div>
  </div>
</template>

<script>
import WeatherIcon from "../icons/WeatherIcon.vue";
import WindDirection from "../icons/WindDirection.vue";

export default {
  components: {
    WeatherIcon,
    WindDirection,
  },
  props: {
    sunrise: {
      type: Date,
      required: true,
    },
    sunset: {
      type: Date,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    minimumTemperature: {
      type: Number,
      required: true,
    },
    maximumTemperature: {
      type: Number,
      required: true,
    },
    windDegree: {
      type: Number,
      required: true,
    },
    windDirection: {
      type: String,
      required: true,
    },
    windSpeed: {
      type: Number,
      required: true,
    },
  },
};
</script>
