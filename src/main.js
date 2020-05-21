require('bootstrap');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify' 
import './registerServiceWorker'
import router from './router'
import store from './store'
import '../src/assets/sass/app.scss'

Vue.config.productionTip = false
Vue.use(Vuetify); 


new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
