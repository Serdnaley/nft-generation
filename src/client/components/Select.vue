<template>
  <select
    :value="modelValue"
    class="Select"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-for="item of options" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Select',

  props: {
    modelValue: {},

    options: {
      type: [Array, Object],
      default: () => []
    },
  },

  emits: ['update:modelValue'],
})
</script>

<style lang="scss">
.Select {
  display: inline-block;
  padding: 3px 7px;
  user-select: none;
  cursor: pointer;
  background: white;
  border-radius: 5px;
  border: 1px solid black;
  color: black;
  transition: .3s;
  font-size: 14px;
}
</style>
