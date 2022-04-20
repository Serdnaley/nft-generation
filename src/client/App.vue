<template>
  <div class="App">
    <div class="App__options-panel">
      <div class="App__options-panel-title">
        Layers
      </div>

      <transition-group name="App__list-transition-">
        <LayerOptions
          v-for="(layer, index) in layers"
          :key="layer.id"
          :index="index"
          :layer="layer"
          class="App__options-panel-item"
          @up="up(index)"
          @down="down(index)"
          @remove="remove(index)"
        />
      </transition-group>

      <Button
        class="App__options-panel-add-button"
        @click="add()"
      >
        New layer
      </Button>
    </div>

    <div class="App__result">
      <LazyLoadImage
        :src="resultImageUrl"
        class="App__result-img"
      />

      <Button
        @click="render()"
        class="App__result-button"
      >
        Render
      </Button>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { layerTypes, rarityTypes } from '@/traits/enums'
import LayerOptions from '@/client/components/LayerOptions'
import LazyLoadImage from '@/client/components/LazyLoadImage'
import Button from '@/client/components/Button'
import { traits } from '@/traits'

const {
  VUE_APP_SERVER_URL,
} = process.env

export default defineComponent({
  name: 'ExamplesPage',

  components: {
    Button,
    LazyLoadImage,
    LayerOptions,
  },

  setup () {
    const layers = reactive([
      {
        id: 1,
        layerType: layerTypes.BACKGROUND,
        trait: traits.find(trait => trait.layerType === layerTypes.BACKGROUND),
      },
      {
        id: 2,
        layerType: layerTypes.BODY,
        trait: traits.find(trait => trait.layerType === layerTypes.BODY),
      },
      {
        id: 3,
        layerType: layerTypes.HEAD,
        trait: traits.find(trait => trait.layerType === layerTypes.HEAD),
      },
      {
        id: 4,
        layerType: layerTypes.OUTFIT,
        trait: traits.find(trait => trait.layerType === layerTypes.OUTFIT),
      },
      {
        id: 5,
        layerType: layerTypes.NOSE,
        trait: traits.find(trait => trait.layerType === layerTypes.NOSE),
      },
      {
        id: 5,
        layerType: layerTypes.MOUTH,
        trait: traits.find(trait => trait.layerType === layerTypes.MOUTH),
      },
      {
        id: 6,
        layerType: layerTypes.EYES,
        trait: traits.find(trait => trait.layerType === layerTypes.EYES),
      },
      {
        id: 7,
        layerType: layerTypes.SUNGLASSES,
        trait: traits.find(trait => trait.layerType === layerTypes.SUNGLASSES),
      },
      {
        id: 8,
        layerType: layerTypes.HEADWEAR,
        trait: traits.find(trait => trait.layerType === layerTypes.HEADWEAR),
      },
    ])

    const resultImageUrl = ref(null)

    const render = () => resultImageUrl.value = `${VUE_APP_SERVER_URL}/image.png?layers=${JSON.stringify(layers)}`
    render()

    const up = (index) => {
      if (index <= 0) return

      const layer = layers[index]

      layers[index] = layers[index - 1]
      layers[index - 1] = layer
    }

    const down = (index) => {
      if (index >= layers.length - 1) return

      const layer = layers[index]

      layers[index] = layers[index + 1]
      layers[index + 1] = layer
    }

    const remove = (index) => layers.splice(index, 1)

    const add = () => layers.push({
      id: Math.random(),
      layerType: layerTypes.BODY,
      trait: null,
    })

    return {
      layers,
      rarityTypes,
      layerTypes,
      resultImageUrl,
      render,
      up,
      down,
      remove,
      add,
    }
  },
})
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: sans-serif;
}

.App {
  display: flex;

  &__options-panel {
    width: 50%;
    padding: 15px;
    padding-bottom: 150px;

    &-title {
      font-size: 64px;
    }

    &-item {
      margin-top: 30px;
    }

    &-add-button {
      margin-top: 30px;
    }
  }

  &__result {
    position: sticky;
    top: 0;
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-img {
      width: 500px;
      height: 500px;
      border: 1px solid black;
    }

    &-button {
      margin-top: 30px;
    }
  }

  &__list-transition {
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
