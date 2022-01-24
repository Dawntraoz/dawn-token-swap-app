<template>
  <div class="container mx-auto px-4">
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
});
</script>
