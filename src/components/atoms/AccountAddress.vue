<template>
  <p v-if="address" :title="address" class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 512 512">
      <title>Your account</title>
      <path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
      <path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
    </svg>
    {{ `${address.substr(0, 3)}...${address.substr(-8)}` }}
  </p>
  <p v-else>Log in</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccountAddress',
  computed: {
    address() {
      return this.$store.getters.address;
    }
  },
  async mounted() {
    await this.$store.dispatch('getAddress');
  }
});
</script>
