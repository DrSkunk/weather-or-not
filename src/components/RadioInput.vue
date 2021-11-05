<template>
  <label
    :class="[
      'flex h-12 items-center hover:bg-gray-100 cursor-pointer rounded',
      selectedValue === value ? 'bg-gray-100' : 'bg-gray-50',
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
    selectedValue: {
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
