import Vue from 'vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import routes from '@/routes';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import App from './App.vue';

import DefaultLayout from './layouts/Default/Default.vue';
import CleanLayout from './layouts/Clean/Clean.vue';

locale.use(lang);

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({ mode: 'history', routes });

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const accessToken = localStorage.getItem('access_token');

  if (requiresAuth && !accessToken) {
    next({
      name: 'Sign In'
    })
  }

  next()
});

Vue.component('default-layout', DefaultLayout);
Vue.component('clean-layout', CleanLayout);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
