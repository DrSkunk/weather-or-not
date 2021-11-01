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
          code: "en",
        },
        {
          name: "Nederlands",
          code: "nl",
        },
      ],
    };
  },
  methods: {
    changeLanguage(language) {
      this.$i18n.locale = language;
    },
  },
};
</script>
