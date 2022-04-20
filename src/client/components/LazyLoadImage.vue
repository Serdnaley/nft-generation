<template>
  <div
    class="LazyLoadImage"
    :class="{ 'LazyLoadImage--loading': !isLoaded }"
  >
    <img
      :src="src"
      alt=""
      @error="isLoaded = true"
      @load="isLoaded = true"
    >
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'LazyLoadImage',

  props: {
    src: {
      type: String,
      required: true
    },
  },

  setup (props) {
    const isLoaded = ref(false)

    watch(() => props.src, () => isLoaded.value = false)

    return {
      isLoaded
    }
  },
})
</script>

<style lang="scss">
.LazyLoadImage {
  position: relative;

  &:before {
    content: '';
    display: none;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: transparent;
  }

  &--loading {
    &:before {
      display: block;
      animation: LazyLoadImage__anim 1s linear infinite;

      @keyframes LazyLoadImage__anim {
        0%, 100% {
          background: #989898;
        }

        50% {
          background: #676767;
        }
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
