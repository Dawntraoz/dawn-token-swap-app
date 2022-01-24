import type { Module } from 'vuex';

export type Token = {
  id: string;
  name: string;
  image: string;
}

export type Pool = {
  poolId: number;
  tokenA: string;
  tokenB: string;
  price: number;
}

export type Tokens = {
  tokenFrom: Token | any;
  priceFrom: string;
  tokenTo: Token | any;
  priceTo: string;
  tokens: Token[];
  pools: Pool[];
};

const tokens: Module<Tokens, unknown> = {
  state() {
    return {
      tokenFrom: undefined,
      priceFrom: '0',
      tokenTo: undefined,
      priceTo: '0',
      tokens: [],
      pools: []
    };
  },
  getters: {
    tokenFrom(state) {
      return state.tokenFrom
    },
    priceFrom(state) {
      return state.priceFrom
    },
    tokenTo(state) {
      return state.tokenTo
    },
    priceTo(state) {
      return state.priceTo
    },
    tokens(state) {
      return state.tokens
    },
    pools(state) {
      return state.pools
    },
  },
  mutations: {
    SET_TOKEN_FROM(state, tokenFrom: Token) {
      state.tokenFrom = tokenFrom;
    },
    SET_PRICE_FROM(state, priceFrom: string) {
      state.priceFrom = priceFrom;
    },
    SET_TOKEN_TO(state, tokenTo: Token) {
      state.tokenTo = tokenTo;
    },
    SET_PRICE_TO(state, priceTo: string) {
      state.priceTo = priceTo;
    },
    SET_TOKENS(state, tokens: Token[]) {
      state.tokens = tokens;
    },
    SET_POOLS(state, pools: Pool[]) {
      state.pools = pools;
    },
  },
  actions: {
    setTokenFrom({ commit }, tokenFrom: Token) {
      commit('SET_TOKEN_FROM', tokenFrom);
    },
    setPriceFrom({ commit }, priceFrom: string) {
      commit('SET_PRICE_FROM', priceFrom);
    },
    setTokenTo({ commit }, tokenTo: Token) {
      commit('SET_TOKEN_TO', tokenTo);
    },
    setPriceTo({ commit }, priceTo: string) {
      commit('SET_PRICE_TO', priceTo);
    },
    async getTokens({ commit }) {
      const response = await fetch(new Request('/data/tokens.json'));
      const { tokens } = await response.json();
      commit('SET_TOKENS', tokens);
      commit('SET_TOKEN_FROM', tokens[0]);
    },
    async getPools({ commit }) {
      const response = await fetch(new Request('/data/pools.json'));
      const { pools } = await response.json();
      commit('SET_POOLS', pools);
    },
  },
};

export default tokens;