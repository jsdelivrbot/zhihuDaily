import Vue from 'vue'
import App from './App.vue'
//import 'mint-ui/lib/style.css'
import VueResource from 'vue-resource'

import MintUI from 'mint-ui'

Vue.use(VueResource)

Vue.use(MintUI)

import router from './router'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
