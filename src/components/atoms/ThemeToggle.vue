<template>
  <div class="flex items-center gap-3">
    <svg v-if="!themeToggle" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 512 512">
      <title>Dark mode</title>
      <path  d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 512 512">
      <title>Light mode</title>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94" />
      <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" />
    </svg>
    <input v-model="themeToggle" class="theme-toggle" type="checkbox" title="Change application theme" @change="changeTheme" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ThemeToggle',
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
  @apply relative appearance-none bg-violet-700 dark:bg-violet-100 cursor-pointer rounded-xl w-10 h-5 focus:outline-solid-violet-300 dark:focus:outline-solid-violet-500;
	-webkit-tap-highlight-color: transparent;
}
.theme-toggle::before {
  @apply content-[''] absolute top-1 left-1 transform translate-x-0 w-3 h-3 block dark:bg-violet-600 bg-violet-50 rounded-1/2 transition-transform duration-300 linear;
}
.theme-toggle:checked::before {
  @apply transform translate-x-5;
}
</style>
