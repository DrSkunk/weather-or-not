<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { getNameFromPosition, getUserLocationFromIp } from "../api/location";

export default {
  async created() {
    if (!("geolocation" in navigator)) {
      return;
    }

    const store = useStore();

    getUserLocationFromIp().then(({ latitude, longitude, city }) => {
      console.log(latitude, longitude, city);
      store.commit("setLocation", {
        latitude,
        longitude,
      });
      store.commit("setLocationName", city);
    });

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
  },
  setup() {
    const store = useStore();
    return {
      location: computed(() => store.state.location),
    };
  },
};
</script>
