<template>
  <div class="flex flex-row sm:flex-col py-4 mx-4">
    <div class="text-left">
      <div class="text-xl">{{ $d(day, "dayShort") }}</div>
      <div class="text-md">{{ description }}</div>
    </div>
    <div><img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" /></div>
    <div class="grid grid-cols-2 w-20 gap-2 ml-auto text-xl">
      <div class="text-lg">{{ minimumTemperatureLocalised }}°</div>
      <div class="text-lg">{{ maximumTemperatureLocalised }}°</div>
      <IconWindDirection :style="`transform: rotate(${180 + windDegree}deg)`" />
      <div class="text-left">
        <div>{{ windDirection }}</div>
        <div>{{ beaufort }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { IconWindDirection } from "./weatherIcons";
import {
  degreeToWindDirection,
  kelvinToCelsius,
  msToBeaufort,
} from "../api/unit";
export default {
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
  },
  components: {
    IconWindDirection,
  },
  data() {
    return {
      minimumTemperatureLocalised: kelvinToCelsius(this.minimumTemperature),
      maximumTemperatureLocalised: kelvinToCelsius(this.maximumTemperature),
      beaufort: msToBeaufort(this.windSpeed),
      windDirection: degreeToWindDirection(this.windDegree),
    };
  },
};
</script>
