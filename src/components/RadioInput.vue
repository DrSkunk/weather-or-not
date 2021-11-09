<template>
  <div class="cursor-pointer rounded bg-gray-100 pointer">
    <label
      :class="[
        'h-12 inline-flex items-center hover:bg-gray-200 transition hover:translate-x-1 hover:-translate-y-1 cursor-pointer rounded pl-4 pr-2',
      ]"
    >
      <input
        type="radio"
        :name="name"
        :value="value"
        :checked="selectedValue === value"
        @click="onClick(value)"
      />
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    selectedValue: {
      type: String,
      required: true,
    },
    name: {
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
