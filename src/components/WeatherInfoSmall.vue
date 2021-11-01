<template>
  <div class="flex flex-row sm:flex-col py-4 mx-4 text-white">
    <div class="text-left">
      <div>{{ dayName }}</div>
      <div class="font-thin">{{ main }}</div>
    </div>
    <div><img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" /></div>
    <div class="grid grid-cols-2 gap-2 ml-auto text-xl">
      <div class="">{{ maximumTemperatureLocalised }}°</div>
      <div class="font-thin">{{ minimumTemperatureLocalised }}°</div>
      <img
        :style="`transform: rotate(${180 + windDegree}deg)`"
        src="https://www.vrt.be/etc.clientlibs/vrtnieuws/clientlibs/clientlib-v2-site/resources/images/weather-winddirection-default.svg"
      />
      <div class="text-left">
        <div>{{ windDirection }}</div>
        <div>{{ beaufort }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { shortWeekDaysArray } from "../api/i18n";
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
    main: {
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
  data() {
    console.log(this.day);
    return {
      dayName: shortWeekDaysArray[this.day.getDay()],
      minimumTemperatureLocalised: kelvinToCelsius(this.minimumTemperature),
      maximumTemperatureLocalised: kelvinToCelsius(this.maximumTemperature),
      beaufort: msToBeaufort(this.windSpeed),
      windDirection: degreeToWindDirection(this.windDegree),
    };
  },
};
</script>
