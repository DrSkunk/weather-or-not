<template>
  <div class="relative pb-4">
    <div
      class="
        w-72
        bg-gray-100
        border-b-4 border-gray-300
        rounded-tl-xl rounded-br-xl
        relative
        flex
        items-center
      "
    >
      <SearchIcon class="w-5 left-4 text-gray-500 absolute" />
      <input
        ref="input"
        v-model="locationNameInput"
        tabindex="-1"
        type="text"
        class="
          w-full
          pl-12
          pr-4
          py-2
          bg-transparent
          z-10
          active:rounded-tl-xl active:rounded-br-xl
          focus:rounded-tl-xl focus:rounded-br-xl
          selected:rounded
        "
        :placeholder="$t('whereAreYou')"
        @keydown.arrow-up="selectPreviousResult"
        @keydown.arrow-down="selectNextResult"
        @keydown.enter="selectResult"
      />
    </div>

    <ul
      v-if="results.length > 0"
      class="
        absolute
        flex flex-col
        top-12
        z-10
        bg-white
        border
        w-72
        divide-y
        cursor-pointer
      "
    >
      <li
        v-for="(result, index) in results"
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
</template>

<script>
import { onMounted } from "vue";
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { SearchIcon } from "@heroicons/vue/solid";
import { search } from "../api/location";

function truncate(text) {
  const length = 35;
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export default {
  components: { SearchIcon },
  setup() {
    const store = useStore();
    const input = ref(null);
    onMounted(() => {
      input.value.focus();
    });
    return {
      location: computed(() => store.state.location),
      locationName: computed(() => store.state.locationName),
      input,
    };
  },

  data() {
    return {
      locationNameInput: "",
      results: [],
      selectedResult: -1,
      shouldSearch: true,
    };
  },
  watch: {
    locationName: function () {
      this.shouldSearch = false;
      this.locationNameInput = this.locationName;
    },
    locationNameInput: async function (query) {
      if (query.length === 0 || !this.shouldSearch) {
        this.shouldSearch = true;
        this.results = [];
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
  methods: {
    setLocation({ coordinates, name }) {
      this.$store.dispatch("setLocation", coordinates);
      this.$store.dispatch("setLocationName", name);
      this.results = [];
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
};
</script>
