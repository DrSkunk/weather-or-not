<template>
  <label
    :class="[
      'block w-12 hover:bg-gray-100 cursor-pointer rounded',
      selectedScale === value ? 'bg-gray-100' : 'bg-gray-50',
    ]"
  >
    <input type="radio" class="hidden" :value="value" @click="onClick(value)" />
    <span class="sr-only" v-text="value" />
    <slot />
  </label>
</template>

<script>
export default {
  props: {
    selectedScale: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>
