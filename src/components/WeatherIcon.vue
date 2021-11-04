<template>
  <div>
    <component :is="`Icon${icon}`" />
  </div>
</template>

<script>
import * as components from "./weatherIcons";
export default {
  components: {
    ...components,
  },
  props: {
    icon: { type: String, required: true },
    description: { type: String, required: true },
  },
};
</script>
