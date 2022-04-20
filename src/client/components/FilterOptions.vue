<template>
  <div class="FilterOptions">
    <Select
      v-model="filter.type"
      :options="filterTypes"
    />

    <label
      v-for="field in propertiesByType[filter.type]"
      :key="field"
      class="FilterOptions__item"
    >
      {{ field }}:
      <input
        v-model="filter[field]"
        v-bind="getInputProps(field)"
      >
    </label>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { filterTypes } from '@/enums'
import Select from '@/client/components/Select'
import { FilterOptions } from '@/client/entities'

export default defineComponent({
  name: 'FilterOptions',

  components: { Select },

  props: {
    filter: {
      type: FilterOptions,
      required: true
    },

    index: {
      type: Number,
      required: true
    },
  },

  setup () {
    const propertiesByType = {
      [filterTypes.LIGHTEN]: ['amount'],
      [filterTypes.BRIGHTEN]: ['amount'],
      [filterTypes.DARKEN]: ['amount'],
      [filterTypes.DESATURATE]: ['amount'],
      [filterTypes.SATURATE]: ['amount'],
      [filterTypes.GREYSCALE]: ['amount'],
      [filterTypes.SPIN]: ['degree'],
      [filterTypes.HUE]: ['degree'],
      [filterTypes.MIX]: ['color', 'amount'],
      [filterTypes.TINT]: ['amount'],
      [filterTypes.SHADE]: ['amount'],
      [filterTypes.XOR]: ['color'],
      [filterTypes.RED]: ['amount'],
      [filterTypes.GREEN]: ['amount'],
      [filterTypes.BLUE]: ['amount'],
    }

    const getInputProps = (field) => ({
      amount: { type: 'number', min: 0, max: 100 },
      degree: { type: 'number', min: 0, max: 360 },
      color: { type: 'color' },
    })[field]

    return {
      filterTypes,
      propertiesByType,
      getInputProps,
    }
  },
})
</script>

<style lang="scss">
.FilterOptions {
  &__item {
    margin-left: 15px;
  }
}
</style>
