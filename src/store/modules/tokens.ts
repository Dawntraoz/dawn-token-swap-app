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
  tokenTo: Token | any;
  priceFrom: string;
  priceTo: string;
  tokens: Token[];
  pools: Pool[];
};

const tokens: Module<Tokens, unknown> = {
  state() {
    return {
      tokenFrom: undefined,
      tokenTo: undefined,
      priceFrom: '',
      priceTo: '',
      tokens: [],
      pools: []
    };
  },
  getters: {
    tokenFrom(state): Token {
      return state.tokenFrom
    },
    tokenTo(state): Token {
      return state.tokenTo
    },
    priceFrom(state): string {
      return state.priceFrom
    },
    priceTo(state): string {
      return state.priceTo
    },
    tokens(state): Token[] {
      return state.tokens
    },
    getPoolByTokens: (state) => (tokenFrom: string, tokenTo: string): Pool | undefined => {
      const comparePoolTokens = (token: string, pool: Pool): boolean => (pool.tokenA === token || pool.tokenB === token);
      return state.pools.find(pool => comparePoolTokens(tokenFrom, pool) && comparePoolTokens(tokenTo, pool))
    },
    pools(state): Pool[] {
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
    setTokenTo({ commit }, tokenTo: Token) {
      commit('SET_TOKEN_TO', tokenTo);
    },
    setPriceFrom({ commit }, priceFrom: string) {
      commit('SET_PRICE_FROM', priceFrom);
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