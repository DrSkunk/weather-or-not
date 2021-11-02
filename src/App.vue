<script setup>
import WeatherInfo from "./components/WeatherInfo.vue";
import Counter from "./components/Counter.vue";
import LocationInput from "./components/LocationInput.vue";
import Map from "./components/Map.vue";
</script>

<template>
  <div>
    <!-- <WeatherInfo /> -->
    <!-- <Counter /> -->
    <LocationInput />
    <div class="h-96">
      <Map />
    </div>
  </div>
</template>
