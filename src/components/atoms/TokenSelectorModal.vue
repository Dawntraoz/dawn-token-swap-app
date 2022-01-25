<template>
  <div class="fixed z-4 inset-0 bg-violet-500 bg-opacity-50 pt-16 px-4" @click="clickOutside">
    <ul ref="tokenSelectorDialog" class="max-h-[80vh] overflow-y-auto w-lg max-w-full bg-white dark:bg-violet-500 rounded-2xl shadow-lg mx-auto py-4">
      <li class="pb-4">
        <button class="block ml-auto px-4 group" @click="$emit('closeModal')">
          <svg xmlns="http://www.w3.org/2000/svg" class="modal-close-icon group-hover:bg-violet-700 group-hover:text-violet-200 dark:group-hover:bg-violet-200 dark:group-hover:text-violet-900" viewBox="0 0 512 512">
            <title>Close modal</title>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368" />
          </svg>
        </button>
      </li>
      <li
        v-for="{ id, name, image } in tokens"
        :key="`crypto-token-${id}`"
        class="modal-token-item"
        :class="{ disabled: (tokenFrom?.id === id || tokenTo?.id === id) }"
        @click="sendSelectedToken({ id, name, image })"
      >
        <img :src="image" :alt="`${name} logo`" width="40" height="40" class="bg-white rounded-full w-10 h-10 p-1" loading="lazy" />
        <p class="flex flex-col font-medium">
          {{ id }}
          <span class="modal-token-name">{{ name }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Token } from '../../store/modules/tokens';

export default defineComponent({
  name: 'TokenSelectorModal',
  emits: ['closeModal', 'selectedToken'],
  computed: {
    tokens() {
      return this.$store.getters.tokens;
    },
    tokenFrom() {
      return this.$store.getters.tokenFrom;
    },
    tokenTo() {
      return this.$store.getters.tokenTo;
    },
  },
  methods: {
    clickOutside(event: Event): void {
      const childElement = this.$refs['tokenSelectorDialog'] as HTMLElement;
      if (event.target instanceof HTMLElement && !childElement.contains(event.target)) {
        this.$emit('closeModal');
      }
    },
    sendSelectedToken(token: Token) {
      this.$emit('selectedToken', token);
    }
  }
});
</script>

<style scoped>
.modal-close-icon {
  @apply w-6 h-6 border border-violet-900 dark:border-violet-200 rounded-full transition duration-300;
}
.modal-token-item {
  @apply grid grid-cols-[40px,minmax(auto,1fr)] items-center py-2 px-6 gap-x-4 cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-700 hover:bg-opacity-70;
}
.modal-token-item.disabled {
  @apply pointer-events-none opacity-50 hover:bg-transparent;
}
.modal-token-name {
  @apply font-light text-xs text-violet-500 dark:text-violet-200;
}
</style>