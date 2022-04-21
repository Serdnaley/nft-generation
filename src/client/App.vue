<template>
  <div class="App">
    <div class="App__options-panel">
      <div class="App__options-panel-title">
        Layers
      </div>

      <List
        :items="layers"
        :constructor="LayerOptionsConstructor"
        add-button-text="New layer"
      >
        <template #item="{ item, index }">
          <LayerOptions
            :index="index"
            :layer="item"
          />
        </template>
      </List>
    </div>

    <div class="App__result">
      <p>Image size: 2048x2048</p>

      <LazyLoadImage
        :src="resultImageUrl"
        class="App__result-img"
      />

      <Button
        class="App__result-button"
        :disabled="isLoading"
        @click="!isLoading && render()"
      >
        {{ isLoading ? 'Loading...' : 'Render' }}
      </Button>

      <p v-if="timeSpent">
        Rendered in {{ timeSpentFormatted }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from 'vue'
import { layerTypes, rarityTypes } from '@/enums'
import { LayerOptions as LayerOptionsConstructor } from '@/client/entities'
import LayerOptions from '@/client/components/LayerOptions'
import LazyLoadImage from '@/client/components/LazyLoadImage'
import Button from '@/client/components/Button'
import List from '@/client/components/List'

const {
  VUE_APP_SERVER_URL,
} = process.env

export default defineComponent({
  name: 'App',

  components: {
    List,
    Button,
    LazyLoadImage,
    LayerOptions,
  },

  setup () {
    const layers = reactive([
      new LayerOptionsConstructor({ layerType: layerTypes.BACKGROUND }),
      new LayerOptionsConstructor({ layerType: layerTypes.BODY }),
      new LayerOptionsConstructor({ layerType: layerTypes.HEAD }),
      new LayerOptionsConstructor({ layerType: layerTypes.OUTFIT }),
      new LayerOptionsConstructor({ layerType: layerTypes.NOSE }),
      new LayerOptionsConstructor({ layerType: layerTypes.MOUTH }),
      new LayerOptionsConstructor({ layerType: layerTypes.EYES }),
      new LayerOptionsConstructor({ layerType: layerTypes.SUNGLASSES }),
      new LayerOptionsConstructor({ layerType: layerTypes.HEADWEAR }),
    ])

    const resultImageUrl = ref(null)

    const timeSpent = ref(0)
    const timeSpentFormatted = computed(() => {
      return timeSpent.value >= 1000
        ? `${(timeSpent.value / 1000).toFixed(2)}s`
        : `${(timeSpent.value).toFixed(2)}ms`
    })

    const isLoading = ref(false)
    const render = async () => {
      isLoading.value = true

      const startTime = Date.now()

      const res = await fetch(`${VUE_APP_SERVER_URL}/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ layers }),
      })
        .catch(() => {
          alert('Something went wrong on server')
        })

      if (res?.status !== 200) {
        return alert('Something went wrong on server')
      } else {
        const { fileName } = await res.json()

        resultImageUrl.value = `${VUE_APP_SERVER_URL}/output/${fileName}`
      }

      timeSpent.value = Date.now() - startTime

      isLoading.value = false
    }
    render()

    return {
      LayerOptionsConstructor,
      layers,
      rarityTypes,
      layerTypes,
      resultImageUrl,
      isLoading,
      timeSpent,
      timeSpentFormatted,
      render,
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
    padding: 15px 15px 150px;

    &-title {
      font-size: 64px;
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
}
</style>
