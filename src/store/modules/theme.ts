import type { Module } from 'vuex';

export type Theme = {
  theme: 'dark' | 'light';
};

const theme: Module<Theme, unknown> = {
  state() {
    return {
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    };
  },
  getters: {
    theme(state) {
      return state.theme
    },
  },
  mutations: {
    setTheme(state, payload: 'dark' | 'light') {
      state.theme = payload;
    },
  },
  actions: {
    setTheme({ commit, state }, payload: 'dark' | 'light') {
      document.documentElement.classList.remove(state.theme)
      document.documentElement.classList.add(payload)
      commit('setTheme', payload)
    },
  },
};

export default theme;