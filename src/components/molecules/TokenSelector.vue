<template>
  <button class="flex flex-wrap items-center gap-x-2" @click="toggleTokenModal">
    <p v-if="tokenSelected" class="flex flex-wrap items-center gap-x-2">
      <img :src="tokenSelected.image" :alt="`${tokenSelected.name} logo`" width="40" height="40" class="bg-white rounded-full w-7 h-7 p-1" loading="lazy" />
      {{ tokenSelected.id }}
    </p>
    <p v-else class="text-sm">
      Select Token
    </p>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 fill-current" viewBox="0 0 512 512">
      <title>Open modal</title>
      <path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" />
    </svg>
  </button>
  <token-selector-modal v-if="isOpenModal" @close-modal="isOpenModal = false" @selected-token="sendSelectedToken" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Token } from '../../store/modules/tokens';
import TokenSelectorModal from '../atoms/TokenSelectorModal.vue';

export default defineComponent({
  name: 'TokenSelector',
  components: {
    TokenSelectorModal
  },
  props: {
    tokenSelected: {
      type: Object,
      default: undefined,
    },
  },
  emits: ['selectedToken'],
  data() {
    return {
      isOpenModal: false
    }
  },
  methods: {
    toggleTokenModal() {
      this.isOpenModal = !this.isOpenModal;
    },
    sendSelectedToken(token: Token) {
      this.$emit('selectedToken', token);
      setTimeout(() => {
        this.isOpenModal = false;
      }, 100);
    }
  }
});
</script>