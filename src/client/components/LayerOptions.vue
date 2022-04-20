<template>
  <div class="LayerOptions">
    Layer {{ index }}

    <select v-model="layer.layerType">
      <option v-for="layerType in layerTypes" :value="layerType">
        {{ layerType }}
      </option>
    </select>

    <div class="LayerOptions__actions">
      <Button
        class="LayerOptions__actions-button"
        @click="$emit('up')"
      >
        Up
      </Button>
      <Button
        class="LayerOptions__actions-button"
        @click="$emit('down')"
      >
        Down
      </Button>
      <Button
        class="LayerOptions__actions-button"
        @click="$emit('remove')"
      >
        Remove
      </Button>
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
import { layerTypes } from '@/traits/enums'
import { traits } from '@/traits'
import TraitCard from '@/client/components/TraitCard'
import Button from '@/client/components/Button'

export default defineComponent({
  name: 'LayerOptions',

  components: { Button, TraitCard },

  props: {
    layer: {
      type: Object,
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
      filteredTraits,
      layerTypes,
    }
  },
})
</script>

<style lang="scss">
.LayerOptions {
  position: relative;
  border: 1px solid black;
  border-radius: 5px;
  padding: 15px;
  background: white;

  &__actions {
    position: absolute;
    top: 15px;
    right: 15px;

    &-button {
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
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
