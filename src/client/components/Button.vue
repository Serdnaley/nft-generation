<template>
  <div class="Button">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',

  setup () {
    return {}
  },
})
</script>

<style lang="scss">
.Button {
  display: inline-block;
  padding: 5px 10px;
  user-select: none;
  cursor: pointer;
  background: white;
  border-radius: 5px;
  border: 1px solid black;
  color: black;
  transition: .3s;

  &:hover {
    transition: none;
    border-color: #8d8d8d;
  }
}
</style>
