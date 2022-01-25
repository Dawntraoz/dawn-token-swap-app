<template>
  <input v-if="readonly" :value="modelValue" type="text" placeholder="0.0" class="price-input" readonly />
  <input
    v-else
    v-model="inputValue"
    type="text"
    placeholder="0.0"
    minlength="0"
    maxlength="79"
    autocomplete="off"
    autocorrect="off"
    class="price-input"
  >
  <small-tag v-if="!readonly && +balance === +modelValue" class="absolute top-1/2 right-0 transform -translate-y-1/2 text-sm text-red-500">
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
      inputValue: this.modelValue,
      validationRegex: new RegExp('^[0-9]*[.,]?[0-9]*$')
    }
  },
  watch: {
    inputValue(newValue, oldValue) {
      let validValue = this.validationRegex.test(newValue) ? newValue : oldValue;
      validValue = validValue.replace(',', '.');
      validValue = (+validValue > +this.balance) ? this.balance : validValue;

      this.inputValue = validValue;
      this.$emit('update:modelValue', validValue);
    }
  },
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
