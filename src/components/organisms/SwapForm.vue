<template>
  <form class="swap-card" @submit.prevent>
    <account-address class="ml-auto" />
    <div class="grid grid-cols-[125px,minmax(auto,1fr)] gap-x-4">
      <token-selector :token-selected="tokenFrom" @selected-token="updateToken('setTokenFrom', $event)" />
      <token-input v-model="priceFrom" :balance="$store.getters.getBalanceByToken(tokenFrom?.id)" />
    </div>
    <div class="flex w-full items-center">
      <span class="flex-auto bg-violet-200 h-px"></span>
      <button class="focus:outline-none" @click="swapTokens">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 p-2 bg-white dark:bg-violet-500 border border-violet-200 rounded-full" viewBox="0 0 512 512">
          <title>Swap tokens</title>
          <path d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 00-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 00140-66.92" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M32 256l44-44 46 44M480 256l-44 44-46-44" />
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-[125px,minmax(auto,1fr)] gap-x-4">
      <token-selector :token-selected="tokenTo" @selected-token="updateToken('setTokenTo', $event)" />
      <token-input v-model="priceTo" :balance="$store.getters.getBalanceByToken(tokenTo?.id)" />
    </div>
    <button type="submit" class="bg-violet-700 text-white w-full p-4 font-bold rounded-lg">Swap now</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Token } from '../../store/modules/tokens';
import TokenInput from '../atoms/TokenInput.vue';
import TokenSelector from '../molecules/TokenSelector.vue';
import AccountAddress from '../atoms/AccountAddress.vue';

export default defineComponent({
  name: 'SwapForm',
  components: {
    AccountAddress,
    TokenInput,
    TokenSelector
  },
  computed: {
    tokenFrom() {
      return this.$store.getters.tokenFrom;
    },
    priceFrom: {
      get() {
        return this.$store.getters.priceFrom;
      },
      set(newValue) {
        this.$store.dispatch('setPriceFrom', newValue);
      }
    },
    tokenTo() {
      return this.$store.getters.tokenTo;
    },
    priceTo: {
      get() {
        return this.$store.getters.priceTo;
      },
      set(newValue) {
        this.$store.dispatch('setPriceTo', newValue);
      }
    }
  },
  methods: {
    updateToken(actionName: string, token: Token) {
      this.$store.dispatch(actionName, token);
    },
    swapTokens() {
      const from = { token: this.tokenFrom, price: this.priceFrom };
      const to = { token: this.tokenTo, price: this.priceTo };
      this.$store.dispatch('setTokenFrom', to.token);
      this.$store.dispatch('setPriceFrom', to.price);
      this.$store.dispatch('setTokenTo', from.token);
      this.$store.dispatch('setPriceTo', from.price);
    }
  }
});
</script>

<style scoped>
.swap-card {
  @apply grid gap-y-6 bg-white dark:bg-violet-500 w-lg max-w-full rounded-2xl py-4 px-6 shadow-lg mx-auto;
}
</style>
