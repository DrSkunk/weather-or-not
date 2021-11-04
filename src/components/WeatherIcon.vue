<template>
  <div>
    <component :is="`owm${icon}`" />
  </div>
</template>

<script>
import * as components from "../assets/weatherIcons";
export default {
  props: {
    icon: { type: String, required: true },
    description: { type: String, required: true },
  },
  components: {
    ...components,
  },
};
</script>
