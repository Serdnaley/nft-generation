<template>
  <div class="LayerOptions">
    Layer {{ index }}

    <Select
      v-model="layer.layerType"
      :options="layerTypes"
    />

    <div class="LayerOptions__filters">
      <List
        :items="layer.filters"
        :constructor="FilterOptionsConstructor"
        add-button-text="New filter"
      >
        <template #item="{ item, index }">
          <FilterOptions
            :index="index"
            :filter="item"
          />
        </template>
      </List>
    </div>

    <div class="LayerOptions__traits-wrapper">
      <div class="LayerOptions__traits">
        <TraitCard
          class="LayerOptions__traits-item LayerOptions__traits-item--empty"
          :active="layer.trait === null"
          @click="layer.trait = null"
        >

        </TraitCard>

        <TraitCard
          v-for="trait in filteredTraits"
          :key="trait.fileName"
          :trait="trait"
          :active="trait.fileName === layer.trait?.fileName"
          class="LayerOptions__traits-item"
          @click="layer.trait = trait"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { layerTypes } from '@/enums'
import { traits } from '@/traits'
import TraitCard from '@/client/components/TraitCard'
import Button from '@/client/components/Button'
import Select from '@/client/components/Select'
import FilterOptions from '@/client/components/FilterOptions'
import { LayerOptions } from '@/client/entities'
import List from '@/client/components/List'
import { FilterOptions as FilterOptionsConstructor } from '@/client/entities'

export default defineComponent({
  name: 'LayerOptions',

  components: {
    List,
    FilterOptions,
    Select,
    Button,
    TraitCard,
  },

  props: {
    layer: {
      type: LayerOptions,
      required: true
    },

    index: {
      type: Number,
      required: true
    },
  },

  emits: ['up', 'down', 'remove'],

  setup (props) {
    const filteredTraits = computed(() => traits.filter(trait => trait.layerType === props.layer.layerType))

    return {
      FilterOptionsConstructor,
      filteredTraits,
      layerTypes,
    }
  },
})
</script>

<style lang="scss">
.LayerOptions {
  &__filters {
    margin-top: 15px;
  }

  &__traits {
    display: flex;
    margin-top: 15px;
    width: fit-content;

    &-wrapper {
      max-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
    }

    &-item {
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}
</style>
