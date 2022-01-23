<script setup lang="ts"></script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view></router-view>
</template>

<style>
#app {
  @apply font-sans leading-snug text-center text-gray-700 mt-12;
}

nav {
  @apply p-8;
}

nav a {
  @apply font-bold text-gray-700;
}

nav a.router-link-exact-active {
  @apply text-green-500;
}
</style>
