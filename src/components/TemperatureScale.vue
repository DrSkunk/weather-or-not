<template>
  <div class="flex gap-2">
    <RadioInput
      :selected-value="selectedScale"
      :value="temperatureScale.CELSIUS"
      :on-click="setScale"
      ><IconCelsius class="w-12" />
    </RadioInput>
    <RadioInput
      :selected-value="selectedScale"
      :value="temperatureScale.FAHRENHEIT"
      :on-click="setScale"
      ><IconFahrenheit class="w-12" />
    </RadioInput>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import temperatureScale from "api/temperatureScale";
import { useStore } from "vuex";
import { IconCelsius, IconFahrenheit } from "components/icons/weatherIcons";
import RadioInput from "components/RadioInput.vue";

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
