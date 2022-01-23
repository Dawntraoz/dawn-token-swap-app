import { createApp } from 'vue';
import App from './App.vue';

/** Styles - WindiCSS */
import 'virtual:windi.css'

/** Router - Vue Router */
import { router } from './router';

/** Store - Vuex */
import { store, key } from './store';

const app = createApp(App);

app.use(store, key);
app.use(router);

app.mount('#app');
