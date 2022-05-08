<template>
  <input v-if="readonly" :value="modelValue" type="text" placeholder="0.0" class="price-input" readonly />
  <input
    v-else
    :value="inputValue"
    type="text"
    placeholder="0.0"
    minlength="0"
    maxlength="79"
    pattern="^[0-9]*[.,]?[0-9]*$"
    autocomplete="off"
    autocorrect="off"
    class="price-input"
    :class="{ 'text-red-500 dark:text-red-300': +balance < +modelValue }"
    @input="(event) => inputValue = (event.target as HTMLInputElement)?.value"
  >
  <small-tag v-if="!readonly && +balance < +modelValue" class="absolute top-0 right-0 transform -translate-y-1/2 text-xs text-red-500 dark:text-red-300">
    insufficient balance
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
      inputValue: this.modelValue,
      validationRegex: /^[0-9]*[.,]?[0-9]*$/i
    }
  },
  watch: {
    inputValue: {
      handler(newValue, oldValue) {
        let validValue = this.validationRegex.test(newValue) ? newValue : oldValue;
        validValue = validValue?.replace(',', '.');

        this.inputValue = validValue;
        this.$emit('update:modelValue', validValue);
      },
      immediate: true
    }
  },
});
</script>

<style scoped>
.price-input {
  @apply py-4 bg-transparent font-medium text-3xl w-full focus:outline-none;
}
.price-input:read-only {
  @apply font-normal text-violet-400 dark:text-violet-200;
}
</style>
