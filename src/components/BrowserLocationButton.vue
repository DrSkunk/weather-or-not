<template>
  <button
    v-if="show"
    class="
      bg-gray-100
      inline-flex
      items-center
      justify-center
      border-b-4 border-gray-300
      hover:bg-gray-200
      rounded-tl-xl rounded-br-xl
      h-11
      w-11
    "
    @click="setUserLocationFromBrowser"
  >
    <LocationMarkerIcon class="w-5 text-gray-500" />
  </button>
</template>
<script>
import { ref, onMounted } from "vue";
import { LocationMarkerIcon } from "@heroicons/vue/solid";
import { setUserLocationFromBrowser } from "../api/location";

export default {
  components: {
    LocationMarkerIcon,
  },
  setup() {
    const show = ref(false);

    onMounted(() => {
      if ("geolocation" in navigator) {
        show.value = true;
      }
    });

    return {
      show,
    };
  },
  methods: {
    setUserLocationFromBrowser,
  },
};
</script>
