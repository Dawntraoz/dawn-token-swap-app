<template>
  <p v-if="address" :title="address">{{ `${address.substr(0, 3)}...${address.substr(-8)}` }}</p>
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
