import type { Store } from 'vuex';
import type { RootState } from './store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}
