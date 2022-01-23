<template>
  <input :value="modelValue" type="number" min="0" class="bg-transparent font-medium text-3xl w-full focus:outline-none" @keypress="validatePrice" @input="updatePrice($event)">
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TokenInput',
  props: {
    modelValue: {
      type: Number,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      invalidPriceChars: ['-', '+', 'e']
    }
  },
  methods: {
    validatePrice(event: any) {
      if(this.invalidPriceChars.includes(event.key)) event.preventDefault();
    },
    updatePrice(event: any) {
      this.$emit('update:modelValue', +event.target.value)
    }
  }
});
</script>

<style scoped>
.swap-card {
  @apply bg-white dark:bg-violet-500 w-2xl max-w-full rounded-2xl p-6 shadow-lg;
}
</style>
