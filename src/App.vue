<template>
  <div class="container mx-auto py-4">
    <header class="flex just justify-between px-2 sm:px-0">
      <LanguageSelector />
      <TemperatureScale />
    </header>
    <main
      :key="$store.state.temperatureScale"
      class="flex flex-col justify-center items-center mt-4"
    >
      <LocationInput />
      <WeatherInfo />
      <LocateUser />
      <div class="h-96">
        <LocationMap />
      </div>
    </main>
  </div>
</template>

<script>
import WeatherInfo from "components/weatherInfo/WeatherInfo.vue";
import LocationInput from "components/LocationInput.vue";
import LocationMap from "components/LocationMap.vue";
import LanguageSelector from "components/LanguageSelector.vue";
import LocateUser from "components/LocateUser.vue";
import TemperatureScale from "components/TemperatureScale.vue";

export default {
  components: {
    WeatherInfo,
    LocationInput,
    LocationMap,
    LanguageSelector,
    LocateUser,
    TemperatureScale,
  },
};
</script>
