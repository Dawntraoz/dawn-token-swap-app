<template>
  <AppHeader />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AppHeader from './components/layout/AppHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
  },
  mounted() {
    this.$store.dispatch('setTheme', this.$store.getters.theme)
  },
});
</script>

<style>
body {
  @apply bg-violet-100 dark:bg-violet-700 text-violet-900 dark:text-violet-100;
}
</style>