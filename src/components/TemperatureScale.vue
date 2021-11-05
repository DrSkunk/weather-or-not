<template>
  <div>
    <label class="">
      <input
        v-model="temperatureScaleSelect"
        class="hidden"
        type="radio"
        :value="temperatureScale.CELSIUS"
      />
      Celsius
    </label>
    <label>
      <input
        v-model="temperatureScaleSelect"
        type="radio"
        :value="temperatureScale.FAHRENHEIT"
      />
      Fahrenheit
    </label>
    {{ temperatureScaleSelect }}
  </div>
</template>

<script>
import temperatureScale from "api/temperatureScale";

export default {
  data() {
    return {
      temperatureScaleSelect: temperatureScale.CELSIUS,
      temperatureScale,
    };
  },
};
</script>
