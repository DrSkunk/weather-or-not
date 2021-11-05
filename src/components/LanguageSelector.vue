<template>
  <div class="flex gap-2">
    <RadioInput
      v-for="locale in $root.$i18n.availableLocales"
      :key="locale"
      :value="locale"
      :selected-value="$root.$i18n.locale"
      :on-click="changeLanguage"
    >
      <div class="px-2">{{ languages[locale] }}</div>
    </RadioInput>
  </div>
</template>

<script>
import { languages } from "@/i18n";
import RadioInput from "components/RadioInput.vue";

export default {
  components: {
    RadioInput,
  },
  data() {
    return {
      languages,
    };
  },
  methods: {
    changeLanguage(language) {
      this.$root.$i18n.locale = language;
    },
  },
};
</script>
