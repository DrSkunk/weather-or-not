<template>
  <div class="flex justify-center gap-4 p-8 text-white">
    <div>
      <img src="https://openweathermap.org/img/wn/02d@2x.png" />
    </div>
    <div class="flex flex-col text-left">
      <!-- <div>vr 29 okt</div> -->
      <div class="text-xl">{{ $d(date, "long") }}</div>
      <div v-text="temperature" class="text-4xl"></div>
      <div>bewolkt met opklaringen</div>
      <div class="text-sm">waarneming van 08:00</div>
    </div>
    <div class="grid grid-cols-2">
      <div class="">Max</div>
      <div>15°</div>
      <div class="">Min</div>
      <div>9°</div>
      <img src="/winddirection.svg" />
      <div>Z4</div>
    </div>
  </div>
</template>

<script>
export default {
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
    windSpeed: {
      type: Number,
      required: true,
    },
  },
};
</script>
