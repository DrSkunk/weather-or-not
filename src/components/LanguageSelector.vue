<template>
  <div class="flex gap-2">
    <RadioInput
      v-for="locale in $root.$i18n.availableLocales"
      :key="locale"
      :value="locale"
      :selected-value="$root.$i18n.locale"
      :on-click="changeLocale"
    >
      <div class="px-2">{{ languages[locale] }}</div>
    </RadioInput>
  </div>
</template>

<script>
import { languages } from "../i18n";
import RadioInput from "./RadioInput.vue";

export default {
  components: {
    RadioInput,
  },
  data() {
    const locale = localStorage.getItem("locale");
    if (locale) {
      this.$root.$i18n.locale = locale;
    }
    return {
      languages,
    };
  },
  methods: {
    changeLocale(locale) {
      localStorage.setItem("locale", locale);
      this.$root.$i18n.locale = locale;
    },
  },
};
</script>
