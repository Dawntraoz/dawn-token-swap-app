<template>
  <input
    :value="modelValue"
    type="text"
    placeholder="0.0"
    minlength="0"
    maxlength="79"
    autocomplete="off"
    autocorrect="off"
    class="price-input"
    :readonly="readonly"
    @keypress="validatePrice"
    @keyup="validatePrice"
    @input="updatePrice"
  >
  <small-tag v-if="!readonly && balance === modelValue" class="absolute top-1/2 right-0 transform -translate-y-1/2 text-sm text-red-500">
    {{ +balance ? 'max. balance' : 'insufficient balance' }}
  </small-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SmallTag from './SmallTag.vue';

export default defineComponent({
  name: 'TokenInput',
  components: {
    SmallTag
  },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    balance: {
      type: String,
      default: '0'
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
      if(!this.validationRegex.test(currentValue) || this.balance === this.modelValue) {
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
.price-input:read-only {
  @apply font-normal text-violet-400 dark:text-violet-200;
}
</style>
