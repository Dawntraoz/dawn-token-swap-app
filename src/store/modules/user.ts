import type { Module } from 'vuex';

type Balance = {
  token: string;
  balance: number;
}

export type User = {
  address: string;
  balances: Balance[];
};

const user: Module<User, unknown> = {
  state() {
    return {
      address: '',
      balances: []
    };
  },
  getters: {
    address(state) {
      return state.address
    },
    balances(state) {
      return state.balances
    },
  },
  mutations: {
    SET_ADDRESS(state, address: string) {
      state.address = address;
    },
    SET_BALANCES(state, balances: Balance[]) {
      state.balances = balances;
    },
  },
  actions: {
    async getAddress({ commit }) {
      const response = await fetch(new Request('/data/address.json'));
      const { address } = await response.json();
      commit('SET_ADDRESS', address)
    },
    async getBalances({ commit }) {
      const response = await fetch(new Request('/data/balances.json'));
      const { balances } = await response.json();
      commit('SET_BALANCES', balances);
    },
  },
};

export default user;