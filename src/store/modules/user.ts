import type { Module } from 'vuex';

type Balance = {
  token: string;
  balance: string;
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
    address(state): string {
      return state.address
    },
    balances(state): Balance[] {
      return state.balances
    },
    getBalanceByToken: (state) => (tokenId: string): string => {
      return state.balances.find(balance => balance.token === tokenId)?.balance ?? '0'
    }
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
      const response = await fetch(new Request('/data/account.json'));
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