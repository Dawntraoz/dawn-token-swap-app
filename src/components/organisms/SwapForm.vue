<template>
  <form class="swap-card" @submit.prevent>
    <account-address class="ml-auto" />
    <div class="relative grid grid-cols-[125px,minmax(auto,1fr)] gap-x-4">
      <token-selector :token-selected="tokenFrom" @selected-token="updateToken('setTokenFrom', $event)" />
      <token-input :key="balanceFrom" v-model="priceFrom" :balance="balanceFrom"  />
    </div>
    <div class="flex w-full items-center">
      <span class="flex-auto bg-violet-200 h-px"></span>
      <button class="focus:outline-none" @click="invertTokens">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 p-2 bg-white dark:bg-violet-500 border border-violet-200 rounded-full" viewBox="0 0 512 512">
          <title>Swap tokens</title>
          <path d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 00-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 00140-66.92" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M32 256l44-44 46 44M480 256l-44 44-46-44" />
        </svg>
      </button>
    </div>
    <div class="relative grid grid-cols-[125px,minmax(auto,1fr)] gap-4">
      <token-selector :token-selected="tokenTo" @selected-token="updateToken('setTokenTo', $event)" />
      <token-input v-model="priceTo" :readonly="true" />
      <p class="col-span-2 text-xs flex items-center gap-2">
        Pool price:
        <small-tag>{{ currentPool?.price ?? '-' }}</small-tag>
      </p>
    </div>
    <button type="submit" :disabled="!balanceFrom || !currentPool?.price" class="button-submit">Perform swap</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Pool, Token } from '../../store/modules/tokens';
import AccountAddress from '../atoms/AccountAddress.vue';
import SmallTag from '../atoms/SmallTag.vue';
import TokenInput from '../atoms/TokenInput.vue';
import TokenSelector from '../molecules/TokenSelector.vue';

export default defineComponent({
  name: 'SwapForm',
  components: {
    AccountAddress,
    TokenInput,
    TokenSelector,
    SmallTag
  },
  computed: {
    tokenFrom(): Token {
      return this.$store.getters.tokenFrom;
    },
    priceFrom: {
      get(): string {
        return this.$store.getters.priceFrom;
      },
      set(newValue) {
        this.$store.dispatch('setPriceFrom', newValue);
        
        const newPriceTo = this.poolCalculation(this.tokenFrom?.id, newValue);
        if(!newPriceTo) return;
        this.$store.dispatch('setPriceTo', newPriceTo);
      }
    },
    balanceFrom(): string {
      return this.$store.getters.getBalanceByToken(this.tokenFrom?.id);
    },
    tokenTo(): Token {
      return this.$store.getters.tokenTo;
    },
    priceTo(): string {
      return this.$store.getters.priceTo;
    },
    balanceTo(): string {
      return this.$store.getters.getBalanceByToken(this.tokenTo?.id);
    },
    currentPool(): Pool | undefined {
      return this.$store.getters.getPoolByTokens(this.tokenFrom?.id, this.tokenTo?.id);
    }
  },
  methods: {
    updateToken(actionName: string, token: Token) {
      this.$store.dispatch(actionName, token);
      this.$store.dispatch(`resetPrices`);
    },
    invertTokens() {
      const tokenFrom = this.tokenFrom;
      const priceFrom = this.priceFrom;
      const tokenTo = this.tokenTo;
      const priceTo = this.priceTo;
      const balanceTo = this.balanceTo;

      const hasEnoughBalance: boolean = (+priceTo > +balanceTo);

      this.$store.dispatch('invertTokens', {
        tokenFrom: tokenTo,
        tokenTo: tokenFrom,
        priceFrom: hasEnoughBalance ? balanceTo : priceTo,
        priceTo: hasEnoughBalance ? this.poolCalculation(tokenTo?.id, balanceTo) : priceFrom
      });
    },
    poolCalculation(tokenId: string, value: string): string | boolean {
      if(!this.currentPool) return false;
      const multiplicateCondition = tokenId === this.currentPool.tokenA;
      return (multiplicateCondition ? +value * this.currentPool.price : +value / this.currentPool.price).toString();
    }
  }
});
</script>

<style scoped>
.swap-card {
  @apply grid gap-y-6 bg-white dark:bg-violet-500 w-lg max-w-full rounded-2xl py-4 px-6 shadow-lg mx-auto;
}
.button-submit {
  @apply bg-violet-700 text-white w-full p-4 font-bold rounded-lg;
}
.button-submit:disabled {
  @apply bg-violet-200 cursor-not-allowed;
}
</style>
