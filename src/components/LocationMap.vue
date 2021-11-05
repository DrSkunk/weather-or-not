<template>
  <div id="map" />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { defaultZoomLevel, mapboxToken } from "api/config";

export default {
  setup() {
    const store = useStore();
    const location = computed(() => store.state.location);
    const map = ref(null);
    const marker = ref(null);

    onMounted(() => {
      mapboxgl.accessToken = mapboxToken;

      map.value = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v9",
      });

      map.value.on("load", () => {
        // Check if all location values are set
        if (store.getters.hasLocation) {
          const { longitude, latitude } = location.value;
          const coordinates = [longitude, latitude];
          map.value.flyTo({ center: coordinates, zoom: defaultZoomLevel });
          marker.value = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map.value);
        }
      });
    });

    return {
      location,
      map,
      marker,
    };
  },
  watch: {
    location: function (location) {
      const { longitude, latitude } = location;
      const coordinates = [longitude, latitude];
      if (this.marker) {
        this.marker.setLngLat(coordinates);
      } else {
        this.marker = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(this.map);
      }

      this.map.flyTo({
        center: coordinates,
        zoom: defaultZoomLevel,
      });
    },
  },
};
</script>
