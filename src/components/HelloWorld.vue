<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button
    type="button"
    @click="() => store.commit('setCount', store.state.counter.count + 1)"
  >
    Increment
  </button>
  <button
    type="button"
    @click="() => store.commit('setCount', store.state.counter.count - 1)"
  >
    Decrement
  </button>

  <div>count is: {{ store.state.counter.count }}</div>

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { key } from '../store';

defineProps<{ msg: string }>();

const store = useStore(key);
</script>

<style scoped>
a {
  @apply text-green-500;
}

label {
  @apply mx-2 font-bold;
}

code {
  @apply bg-gray-200 py-1 px-2 rounded text-gray-700;
}
</style>
