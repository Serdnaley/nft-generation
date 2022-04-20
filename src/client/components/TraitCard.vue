<template>
  <div
    class="TraitCard"
    :class="{ 'TraitCard--active': active }"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="">
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

const getImage = require.context('../../traits', true, /\.png$/)

export default defineComponent({
  name: 'TraitCard',

  props: {
    trait: {
      type: Object,
      required: false,
    },

    active: {
      type: Boolean,
      required: false,
    },
  },

  setup (props) {
    const imageUrl = computed(() => {
      if (!props.trait) return null

      const { filePath } = props.trait

      return getImage(`./${filePath}`)
    })

    return {
      imageUrl,
    }
  },
})
</script>

<style lang="scss">
.TraitCard {
  height: 50px;
  width: 50px;
  border: 1px solid black;

  &--active {
    border-color: red;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
