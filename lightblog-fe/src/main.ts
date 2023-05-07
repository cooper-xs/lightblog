import { createApp } from 'vue';
import { createPinia, storeToRefs, type Store } from 'pinia';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'virtual:windi.css';
import App from './App.vue';
import router from './router';
import { useAdminStore } from '@/store/admin';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);
const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia);
app.use(ElementPlus);
app.use(router);

// router.beforeEach((to) => {
//   const store = useAdminStore(pinia);
//   console.log('判断admin是否已登录', store.isLoggedIn);
//   if (to.path.startsWith('/admin') && !store.isLoggedIn) {
//     return '/login';
//   }
// });

app.mount('#app');
