<template>
  <div class="flex gap-2">
    <RadioInput
      :selected-value="selectedScale"
      :value="temperatureScale.CELSIUS"
      :on-click="setScale"
      name="temperature-scale"
      ><IconCelsius class="w-12" />
    </RadioInput>
    <RadioInput
      :selected-value="selectedScale"
      :value="temperatureScale.FAHRENHEIT"
      :on-click="setScale"
      name="temperature-scale"
      ><IconFahrenheit class="w-12" />
    </RadioInput>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import temperatureScale from "../api/temperatureScale";
import { useStore } from "vuex";
import { IconCelsius, IconFahrenheit } from "./icons/weatherIcons";
import RadioInput from "./RadioInput.vue";

export default {
  components: { RadioInput, IconCelsius, IconFahrenheit },
  setup() {
    const store = useStore();
    return {
      selectedScale: computed(() => store.state.temperatureScale),
      temperatureScale,
    };
  },
  methods: {
    setScale(scale) {
      this.$store.commit("setTemperatureScale", scale);
    },
  },
};
</script>
