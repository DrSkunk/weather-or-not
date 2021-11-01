<template>
  <div
    class="
      flex
      justify-center
      gap-4
      p-8
      bg-gradient-radial
      from-blue-200
      to-blue-300
      text-white
    "
  >
    <div>
      <img src="https://openweathermap.org/img/wn/02d@2x.png" />
    </div>
    <div class="flex flex-col text-left">
      <div>vr 29 okt</div>
      <div class="text-4xl">11°C</div>
      <div>bewolkt met opklaringen</div>
      <div class="text-sm">waarneming van 08:00</div>
    </div>
    <div class="grid grid-cols-2">
      <div class="">Max</div>
      <div>15°</div>
      <div class="">Min</div>
      <div>9°</div>
      <img
        src="https://www.vrt.be/etc.clientlibs/vrtnieuws/clientlibs/clientlib-v2-site/resources/images/weather-winddirection-default.svg"
      />
      <div>Z4</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
};
</script>
