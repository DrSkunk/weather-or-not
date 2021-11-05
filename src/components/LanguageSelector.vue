<template>
  <div class="flex gap-2">
    <RadioInput :selected-value="locale" value="en" :on-click="changeLanguage">
      <div class="px-2">English</div>
    </RadioInput>
    <RadioInput :selected-value="locale" value="nl" :on-click="changeLanguage">
      <div class="px-2">Nederlands</div>
    </RadioInput>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import RadioInput from "./RadioInput.vue";

export default {
  components: {
    RadioInput,
  },
  setup() {
    const store = useStore();
    return {
      locale: computed(() => store.state.locale),
    };
  },
  methods: {
    changeLanguage(language) {
      this.$store.commit("setLocale", language);
    },
  },
};
</script>
