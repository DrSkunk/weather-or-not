<template>
  <img
    :src="`https://openweathermap.org/img/wn/${icon}@2x.png`"
    :alt="description"
  />
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    description: { type: String, required: true },
  },
};
</script>
