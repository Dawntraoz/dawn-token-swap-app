<template>
  <span class="bg-violet-100 dark:bg-violet-700 py-[3px] px-2 rounded-md">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SmallTag'
});
</script>
