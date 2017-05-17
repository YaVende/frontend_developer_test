import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import 'dependency_manifest';

import App from 'src/app.vue';
import CarListingList from 'src/car_listing/list.vue';
import CarListingDetail from 'src/car_listing/detail.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [{
    name:      'carListings.index',
    path:      '/avisos',
    component: CarListingList
  }, {
    name:      'carListings.show',
    path:      '/avisos/:id',
    component: CarListingDetail
  }]
});

new Vue({
  router,
  render: h => h(App),
  saveScrollPosition: true
})
  .$mount('#app-wrapper');
