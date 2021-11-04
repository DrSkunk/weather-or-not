<template>
  <div v-if="location">
    <div class="relative">
      <input
        v-model="locationName"
        v-on:keydown.arrow-up="selectPreviousResult"
        v-on:keydown.arrow-down="selectNextResult"
        v-on:keydown.enter="selectResult"
        type="text"
        :placeholder="$t('whereAreYou')"
        class="
          w-56
          bg-gray-100 bg-opacity-80
          border-b-4 border-gray-300
          rounded-tl-xl rounded-br-xl
          px-4
          py-2
        "
      />
      <ul
        v-if="results.length > 0"
        class="
          absolute
          flex flex-col
          top-12
          rounded
          z-10
          bg-white
          border
          w-56
          divide-y
          cursor-pointer
        "
      >
        <li
          v-for="(result, index) in this.results"
          :key="result.name"
          :class="[
            'p-2 hover:bg-blue-50',
            index === selectedResult && 'bg-blue-200',
          ]"
          @click="setLocation(result)"
        >
          <div>{{ result.title }}</div>
          <div class="text-sm">{{ result.address }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { SearchIcon } from "@heroicons/vue/solid";

function truncate(text) {
  const length = 30;
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export default {
  setup() {
    const store = useStore();
    return {
      location: computed(() => store.state.location),
    };
  },
  data() {
    return {
      locationName: "",
      results: [],
      selectedResult: -1,
      shouldSearch: true,
    };
  },
  methods: {
    setLocation({ coordinates, name }) {
      this.$store.dispatch("setLocation", coordinates);
      this.$store.dispatch("setLocationName", name);
      this.results = [];
      this.locationName = name;
      this.shouldSearch = false;
    },
    selectPreviousResult() {
      if (this.results.length === 0) {
        this.selectedResult = -1;
        return;
      }
      if (this.selectedResult === 0) {
        this.selectedResult = this.results.length - 1;
      } else {
        this.selectedResult--;
      }
    },
    selectNextResult() {
      if (this.results.length === 0) {
        this.selectedResult = -1;
        return;
      }
      this.selectedResult = (this.selectedResult + 1) % this.results.length;
    },
    selectResult() {
      if (this.results.length === 0) {
        return;
      }
      this.setLocation(this.results[this.selectedResult]);
    },
  },
  watch: {
    locationName: async function (query) {
      if (query.length === 0 || !this.shouldSearch) {
        this.shouldSearch = true;
        return;
      }
      this.results = (await search(query)).map(({ name, coordinates }) => {
        const [title, ...address] = name.split(",");
        return {
          name,
          title,
          address: truncate(address.join(",")),
          coordinates,
        };
      });
    },
  },
};
</script>
