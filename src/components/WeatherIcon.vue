<template>
  <div>
    <component :is="`Icon${icon}`" />
  </div>
</template>

<script>
import * as components from "./weatherIcons";
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
