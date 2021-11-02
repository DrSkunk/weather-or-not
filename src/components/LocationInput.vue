<template>
  <div v-if="location">
    Your location data is {{ location.latitude }}, {{ location.longitude }}
    <input type="text" class="border" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  created() {
    if (!("geolocation" in navigator)) {
      return;
    }
    const store = useStore();
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos);
      const { latitude, longitude, accuracy } = pos.coords;
      store.dispatch("setLocation", { latitude, longitude, accuracy });
    });
  },
  setup() {
    const store = useStore();
    return {
      location: computed(() => store.state.location),
    };
  },
};
</script>
