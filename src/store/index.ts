import type { InjectionKey } from 'vue';
import { createStore } from 'vuex';

import type { Store } from 'vuex';
import modules from './modules';
import type { Theme } from './modules/theme';

export type RootState = {
  theme: Theme;
};

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules,
});
