<template>
  <div>
    <div>
      <span>{{ label }}</span>
    </div>
    <ul>
      <li
        v-for="{ name, code } in languages"
        :key="code"
        @click="changeLanguage(code)"
      >
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languages: [
        {
          name: "English",
          code: "en-US",
        },
        {
          name: "Nederlands",
          code: "nl-BE",
        },
      ],
    };
  },
  methods: {
    changeLanguage(language) {
      this.$store.commit("setLocale", language);
    },
  },
};
</script>
