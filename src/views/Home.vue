<template>
  <div class="container mx-auto py-6 px-4">
    <swap-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SwapForm from '../components/organisms/SwapForm.vue';

export default defineComponent({
  name: 'Home',
  components: {
    SwapForm,
  },
  async mounted() {
    await this.$store.dispatch('getTokens');
    await this.$store.dispatch('getBalances');
  }
});
</script>
