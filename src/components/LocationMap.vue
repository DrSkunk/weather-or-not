<template>
  <div id="map" />
</template>

<script>
import { onMounted } from "vue";
import { ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { getNameFromPosition } from "../api/location";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { defaultZoomLevel, mapboxToken } from "../api/config";

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
        map.value.on("click", async function (e) {
          store.commit("setLocation", {
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng,
          });
          const name = await getNameFromPosition(store.state.location);
          store.commit("setLocationName", name);
        });
        // Check if all location values are set
        if (store.getters.hasLocation) {
          const { longitude, latitude } = location.value;
          const coordinates = [longitude, latitude];
          if (marker.value) {
            marker.value.setLngLat(coordinates);
          } else {
            marker.value = new mapboxgl.Marker()
              .setLngLat(coordinates)
              .addTo(map.value);
          }
          map.value.flyTo({ center: coordinates, zoom: defaultZoomLevel });
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
