// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import {currency} from './util/currency'
import VueFeather from 'vue-feather'
import feather from 'feather-icons'
import VueCookies from 'vue-cookies'
import VueCharts from 'vue-charts'

import './assets/css/base.css'
import './assets/css/product.css'
import './assets/css/checkout.css'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-bars.svg'
})
Vue.filter('currency', currency)
Vue.component(VueFeather.name, VueFeather, feather)
Vue.use(VueCookies)
Vue.use(VueCharts)

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, cartCount) {
      state.cartCount += cartCount
    },
    initCartCount (state, cartCount) {
      state.cartCount = cartCount
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
