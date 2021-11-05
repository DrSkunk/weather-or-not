<template>
  <IconWindDirection
    :style="`transform: rotate(${180 + windDegree}deg)`"
    :alt="`${windDegree}°`"
  />
</template>
<script>
import { IconWindDirection } from "./weatherIcons";

export default {
  components: {
    IconWindDirection,
  },
  props: {
    windDegree: {
      type: Number,
      required: true,
    },
  },
};
</script>
