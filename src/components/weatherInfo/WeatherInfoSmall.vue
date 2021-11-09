<template>
  <div class="flex flex-row lg:flex-col justify-between py-4 mx-4">
    <div class="text-left flex-1 h-16">
      <div class="text-xl">{{ $d(day, "dayShort") }}</div>
      <div class="text-md">{{ description }}</div>
    </div>
    <div class="w-24 mx-auto">
      <WeatherIcon :icon="icon" :description="description" />
    </div>
    <div class="flex-1">
      <div v-if="temperature !== undefined" class="text-lg text-center">
        {{ temperature }}°
      </div>
      <div class="ml-auto lg:mx-auto grid grid-cols-2 w-20 gap-2 text-xl">
        <div v-if="maximumTemperature !== undefined" class="text-lg">
          {{ maximumTemperature }}°
        </div>
        <div v-if="minimumTemperature !== undefined" class="text-lg">
          {{ minimumTemperature }}°
        </div>
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
import WeatherIcon from "../icons/WeatherIcon.vue";
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
    temperature: {
      type: Number,
      required: false,
      default: undefined,
    },
    minimumTemperature: {
      type: Number,
      required: false,
      default: undefined,
    },
    maximumTemperature: {
      type: Number,
      required: false,
      default: undefined,
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
