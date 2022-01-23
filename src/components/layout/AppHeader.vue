<template>
  <header>
    <nav class="container mx-auto p-4 flex items-center justify-between">
      <p class="uppercase">Dawn</p>
      <ul class="flex items-center gap-x-4">
        <li class="py-1 px-3 bg-violet-200 dark:bg-violet-500 rounded">
          <router-link to="/">Swap</router-link>
        </li>
        <li>
          <router-link to="/info">Info</router-link>
        </li>
      </ul>
      <input v-model="themeToggle" class="theme-toggle" type="checkbox" @change="changeTheme" />
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  data() {
    return {
      themeToggle: this.$store.getters.theme === 'dark',
    }
  },
  methods: {
    changeTheme() {
      this.$store.dispatch('setTheme', this.themeToggle ? 'dark' : 'light')
    }
  }
});
</script>

<style scoped>
.theme-toggle {
  @apply relative appearance-none bg-violet-700 dark:bg-violet-100 cursor-pointer rounded-xl w-12 h-6 focus:outline-solid-violet-300 dark:focus:outline-solid-violet-500;
	-webkit-tap-highlight-color: transparent;
}
.theme-toggle::before {
  @apply content-[''] absolute top-1 left-1 transform translate-x-0 w-4 h-4 block dark:bg-violet-600 bg-violet-50 rounded-1/2 transition-transform duration-300 linear;
}
.theme-toggle:checked::before {
  @apply transform translate-x-6;
}
</style>
