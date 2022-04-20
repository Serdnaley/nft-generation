<template>
  <transition-group
    name="List__transition-"
    class="List"
    tag="div"
  >
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="List__item"
    >
      <slot
        name="item"
        :item="item"
        :index="index"
      />

      <div class="List__actions">
        <Button
          class="List__actions-button"
          @click="$emit('up')"
        >
          Up
        </Button>

        <Button
          class="List__actions-button"
          @click="$emit('down')"
        >
          Down
        </Button>

        <Button
          class="List__actions-button"
          @click="$emit('remove')"
        >
          Remove
        </Button>
      </div>
    </div>
  </transition-group>

  <Button
    class="List__add-button"
    @click="add()"
  >
    {{ addButtonText }}
  </Button>
</template>

<script>
import { defineComponent } from 'vue'
import { cloneDeep } from 'lodash'
import Button from '@/client/components/Button'

export default defineComponent({
  name: 'List',

  components: { Button },

  props: {
    items: {
      type: Array,
      required: true,
    },

    constructor: {
      type: Function,
      required: true,
    },

    addButtonText: {
      type: String,
      required: true,
    },
  },

  setup (props) {
    const up = (index) => {
      if (index <= 0) return

      const layer = props.items[index]

      props.items[index] = props.items[index - 1]
      props.items[index - 1] = layer
    }

    const down = (index) => {
      if (index >= props.items.length - 1) return

      const layer = props.items[index]

      props.items[index] = props.items[index + 1]
      props.items[index + 1] = layer
    }

    const remove = (index) => props.items.splice(index, 1)

    const add = () => props.items.push(new props.constructor)

    return {
      up,
      down,
      remove,
      add,
    }
  },
})
</script>

<style lang="scss">
.List {
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

  &__item {
    position: relative;
    border: 1px solid black;
    border-radius: 5px;
    padding: 15px;
    background: white;
    margin-bottom: 15px;
  }

  &__transition {
    &--move {
      transition: .6s ease;
    }

    &--enter-active,
    &--leave-active {
      transition: opacity .6s;
    }

    &--enter,
    &--leave-to {
      opacity: 0;
    }

    &--leave-active {
      position: absolute;
    }
  }
}
</style>
