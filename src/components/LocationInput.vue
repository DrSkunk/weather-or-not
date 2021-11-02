<template>
  <div v-if="location">
    Your location data is {{ location.latitude }}, {{ location.longitude }}
    <div>{{ locationName }}</div>
    <input
      v-model="locationName"
      type="text"
      placeholder="edit me"
      class="border"
    />
    {{ locationName }}
    <ul>
      <li v-for="result in this.results" @click="setLocation(result)">
        {{ JSON.stringify(result) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import {
  getPositionFromName,
  getNameFromPosition,
  search,
} from "../api/location";

export default {
  async created() {
    if (!("geolocation" in navigator)) {
      return;
    }

    const store = useStore();

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      store.dispatch("setLocation", { latitude, longitude });

      const name = await getNameFromPosition(store.state.location);
      if (name) {
        store.dispatch("setLocationName", name);
      }
    });

    if (store.getters.hasLocation) {
      const name = await getNameFromPosition(store.state.location);
      if (name) {
        store.dispatch("setLocationName", name);
      }
    }

    const positions = await search("london");
    console.log("positions", positions);
  },
  setup() {
    const store = useStore();
    return {
      location: computed(() => store.state.location),
      // locationName: computed(() => store.state.locationName),
    };
  },
  data() {
    return {
      locationName: "",
      results: [],
    };
  },
  methods: {
    setLocation({ coordinates, name }) {
      console.log("setLocation", coordinates, name);
      this.$store.dispatch("setLocation", coordinates);
      this.$store.dispatch("setLocationName", name);
      // this.locationName = name;
      // this.location = coordinates;
    },
  },
  watch: {
    locationName: async function (query) {
      if (query.length === 0) {
        return;
      }
      console.log("query", query);
      const results = await search(query);
      console.log("results", results);
      this.results = results;
    },
  },
};
</script>
