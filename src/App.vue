<script setup>
import WeatherInfo from "./components/WeatherInfo.vue";
import Counter from "./components/Counter.vue";
import LocationInput from "./components/LocationInput.vue";
import Map from "./components/Map.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
</script>

<template>
  <main class="container mx-auto">
    <!-- <WeatherInfo /> -->
    <!-- <Counter /> -->
    <!-- <LanguageSelector /> -->
    <LocationInput />
    <div class="h-96">
      <Map />
    </div>
  </main>
</template>
