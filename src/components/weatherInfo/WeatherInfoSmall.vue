<template>
  <div class="flex flex-row sm:flex-col py-4 mx-4">
    <div class="text-left">
      <div class="text-xl">{{ $d(day, "dayShort") }}</div>
      <div class="text-md">{{ description }}</div>
    </div>
    <div class="w-24">
      <WeatherIcon :icon="icon" :description="description" />
    </div>
    <div class="grid grid-cols-2 w-20 gap-2 ml-auto text-xl">
      <div class="text-lg">{{ minimumTemperature }}°</div>
      <div class="text-lg">{{ maximumTemperature }}°</div>
      <IconWindDirection :style="`transform: rotate(${180 + windDegree}deg)`" />
      <div class="text-left">
        <div>{{ windDirection }}</div>
        <div>{{ beaufort }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { degreeToWindDirection } from "api/unitConversion";
import { IconWindDirection } from "components/icons/weatherIcons";
import WeatherIcon from "components/icons/WeatherIcon.vue";

export default {
  components: {
    IconWindDirection,
    WeatherIcon,
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
    windSpeed: {
      type: Number,
      required: true,
    },
    beaufort: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      windDirection: degreeToWindDirection(this.windDegree),
    };
  },
};
</script>
