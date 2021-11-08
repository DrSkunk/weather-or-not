<template>
  <div class="flex flex-col items-center">
    <div
      class="
        flex flex-wrap flex-col
        sm:flex-row
        items-center
        justify-center
        gap-4
      "
    >
      <WeatherIcon
        class="w-24 sm:w-40"
        :icon="icon"
        :description="description"
      />
      <div class="flex flex-col text-left">
        <div class="max-w-xs" v-text="city" />
        <div class="text-xl">{{ $d(date, "long") }}</div>
        <div class="text-4xl sm:text-7xl">{{ temperature }}°</div>
        <div v-text="description" />
      </div>
    </div>
    <button class="flex items-center" @click="showDetails = !showDetails">
      <span>{{ $t("moreInfo") }}</span>
      <ChevronDownIcon
        :class="['w-8', showDetails ? 'transform rotate-90' : '']"
      />
    </button>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div
        v-if="showDetails"
        class="grid grid-cols-4 w-96 border bg-white z-10"
      >
        <WeatherIcon class="w-24" icon="Sunrise" description="Sunrise" />
        <div class="flex items-center justify-center">
          {{ $d(sunrise, "time") }}
        </div>
        <WeatherIcon class="w-24" icon="Sunset" description="Sunset" />
        <div class="flex items-center justify-center">
          {{ $d(sunset, "time") }}
        </div>
        <WeatherIcon class="w-24" icon="Barometer" description="Barometer" />
        <div class="flex items-center justify-center">{{ pressure }} hPa</div>
        <WeatherIcon class="w-24" icon="Humidity" description="Humidity" />
        <div class="flex items-center justify-center">{{ humidity }} %</div>
        <WeatherIcon
          class="w-24"
          :icon="`Beaufort${beaufort}`"
          :description="`${beaufort} Beaufort`"
        />
        <div class="flex items-center justify-center">{{ windSpeed }} m/s</div>
        <WindDirection class="h-24" :wind-degree="windDegree" />
        <div class="flex items-center justify-center">{{ windDirection }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import WeatherIcon from "../icons/WeatherIcon.vue";
import WindDirection from "../icons/WindDirection.vue";

export default {
  components: {
    WeatherIcon,
    WindDirection,
    ChevronDownIcon,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
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
    beaufort: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const showDetails = ref(false);

    return {
      showDetails,
    };
  },
};
</script>
