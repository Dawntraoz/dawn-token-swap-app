<template>
  <teleport to="head">
    <title>{{ title }}</title>
    <meta name="description" :content="description" />
    <meta name="og:title" :content="title" />
    <meta name="og:description" :content="description" />
    <meta name="og:image" :content="imageUrl" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" :content="title" />
    <meta name="twitter:description" :content="description" />
    <meta name="twitter:image" :content="imageUrl" />
  </teleport>
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
  data() {
    return {
      title: 'Dawn Token swap app',
      description: 'A fake Token swapping interface with simulated wallet and some pools.',
      imageUrl: '/images/dawn-token-swap-app.webp' 
    }
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