import { createApp } from 'vue';
import { createPinia, type Store } from 'pinia';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'virtual:windi.css';
import App from './App.vue';
import router from './router';
import { adminStore } from '@/store';

const app = createApp(App);
const pinia = createPinia();
const store = adminStore(pinia);

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin') && !store.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

app.use(pinia);
app.use(ElementPlus);
app.use(router);

app.mount('#app');
