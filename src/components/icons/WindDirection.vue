<template>
  <div :style="`transform: rotate(${180 + windDegree}deg)`">
    <IconWindDirection :alt="`${windDegree}°`" />
  </div>
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
