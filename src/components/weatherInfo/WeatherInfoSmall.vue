<template>
  <div class="flex flex-row md:flex-col justify-between py-4 mx-4">
    <div class="text-left flex-1 h-16">
      <div class="text-xl">{{ $d(day, "dayShort") }}</div>
      <div class="text-md">{{ description }}</div>
    </div>
    <div class="w-24">
      <WeatherIcon :icon="icon" :description="description" />
    </div>
    <div class="flex-1">
      <div class="ml-auto md:mx-auto grid grid-cols-2 w-20 gap-2 text-xl">
        <div class="text-lg">{{ minimumTemperature }}°</div>
        <div class="text-lg">{{ maximumTemperature }}°</div>
        <WindDirection class="w-10" :wind-degree="windDegree" />
        <div class="text-left">
          <div>{{ windDirection }}</div>
          <div>{{ beaufort }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherIcon from "components/icons/WeatherIcon.vue";
import WindDirection from "../icons/WindDirection.vue";

export default {
  components: {
    WeatherIcon,
    WindDirection,
  },
  props: {
    day: {
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
    beaufort: {
      type: Number,
      required: true,
    },
  },
};
</script>
