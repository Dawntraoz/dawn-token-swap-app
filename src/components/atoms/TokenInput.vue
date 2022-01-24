<template>
  <input :value="modelValue" type="text" minlength="0" maxlength="79" class="price-input" @keypress="validatePrice" @input="updatePrice">
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TokenInput',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    balance: {
      type: String,
      default: "0"
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      validationRegex: new RegExp('^[0-9]*[.,]?[0-9]*$')
    }
  },
  methods: {
    validatePrice(event: KeyboardEvent): boolean {
      const target = (event.target as HTMLInputElement);
      const currentValue = `${target.value}${event.key}`;
      if(!this.validationRegex.test(currentValue)) {
        event.preventDefault();
        return false;
      }

      return true;
    },
    updatePrice(event: Event) {
      const target = (event.target as HTMLInputElement);
      const priceValue = target.value.replace(',', '.');
      this.$emit('update:modelValue', (+priceValue > +this.balance) ? this.balance : priceValue);
    }
  }
});
</script>

<style scoped>
.price-input {
  @apply bg-transparent font-medium text-3xl w-full focus:outline-none;
}
</style>
