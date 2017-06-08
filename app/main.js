import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import 'dependency_manifest';

import App from 'components/app.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [{
    name:      'carListings.index',
    path:      '/avisos',
    component: {template: '<p>Listado</p>'}
  }, {
    name:      'carListings.show',
    path:      '/avisos/:id',
    component: {template: '<p>Detalle</p>'}
  }]
});

new Vue({
  router,
  render: h => h(App),
  saveScrollPosition: true
})
  .$mount('#app-wrapper');
