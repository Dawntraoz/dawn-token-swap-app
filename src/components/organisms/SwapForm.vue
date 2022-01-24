<template>
  <form class="swap-card" @submit.prevent>
    <div class="flex items-center gap-x-4">
      <button class="flex items-center gap-x-1">
        <span>ETH</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 fill-current" viewBox="0 0 512 512">
          <title>Caret Down</title>
          <path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" />
        </svg>
      </button>
      <token-input v-model="price" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TokenInput from '../atoms/TokenInput.vue';

export default defineComponent({
  name: 'SwapForm',
  components: {
    TokenInput
  },
  data() {
    return {
      price: 0,
    }
  },
});
</script>

<style scoped>
.swap-card {
  @apply bg-white dark:bg-violet-500 w-2xl max-w-full rounded-2xl p-6 shadow-lg mx-auto;
}
</style>
