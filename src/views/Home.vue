<template>
  <div class="container mx-auto py-6 px-4">
    <p v-if="isLoading" class="text-center">Getting data...</p>
    <swap-form v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SwapForm from '../components/organisms/SwapForm.vue';

export default defineComponent({
  name: 'Home',
  components: {
    SwapForm,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  async mounted() {
    if (!this.$store.getters.tokens.length) {
      await this.$store.dispatch('getTokens');
    }
    if (!this.$store.getters.balances.length) {
      await this.$store.dispatch('getBalances');
    }
    if (!this.$store.getters.pools.length) {
      await this.$store.dispatch('getPools');
    }
    this.isLoading = false;
  },
});
</script>
