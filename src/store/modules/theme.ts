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
    theme(state): 'dark' | 'light' {
      return state.theme
    },
  },
  mutations: {
    SET_THEME(state, theme: 'dark' | 'light') {
      state.theme = theme;
    },
  },
  actions: {
    setTheme({ commit, state }, theme: 'dark' | 'light') {
      document.documentElement.classList.remove(state.theme)
      document.documentElement.classList.add(theme)
      commit('SET_THEME', theme)
    },
  },
};

export default theme;