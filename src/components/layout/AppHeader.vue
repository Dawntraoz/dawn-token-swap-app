<template>
  <header>
    <nav class="container mx-auto p-4 flex items-center justify-between">
      <p class="font-bold uppercase">Dawn</p>
      <ul class="flex items-center gap-x-4">
        <li>
          <router-link class="py-1 px-2 leading-relaxed bg-violet-200 dark:bg-violet-500 rounded" to="/">Swap</router-link>
        </li>
        <li>
          <router-link to="/info">Info</router-link>
        </li>
      </ul>
      <theme-toggle />
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThemeToggle from '../atoms/ThemeToggle.vue';

export default defineComponent({
  name: 'AppHeader',
  components: { ThemeToggle }
});
</script>
