import Vue from 'vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import routes from '@/routes';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import App from './App.vue';

locale.use(lang);

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({ mode: 'history', routes });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
