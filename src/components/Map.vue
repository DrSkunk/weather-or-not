<template>
  {{ location.latitude }}
  <div id="map" class="h-screen w-screen" />
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxToken } from "../api/config";

export default {
  setup() {
    onMounted(() => {
      mapboxgl.accessToken = mapboxToken;
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v9",
      });
      map.on("load", () => {
        // Add an image to use as a custom marker
        map.loadImage(
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
          (error, image) => {
            if (error) throw error;
            map.addImage("custom-marker", image);
          }
        );
      });
    });

    const store = useStore();
    return {
      location: computed(() => store.state.location),
    };
  },
};
</script>
