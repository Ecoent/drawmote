import 'es6-promise/auto'

import Vue from 'vue'
import App from './App.vue'
import { getCookie } from '@/tools/helpers'

import './assets/scss/main.scss'

import Vuetamin from 'vuetamin'
import Connection from './plugins/Connection'

import { store } from './store'
import i18n from './i18n'

Vue.use(Vuetamin, { store })
Vue.use(Connection)

Vue.config.productionTip = false

Vue.prototype.$track = function (category, action, value) {
  window._paq.push(['trackEvent', category, action, value])
}

Vue.prototype.$settings = {
  isPrerendering: window.__PRERENDERING === true
}

const locale = getCookie('locale')
if (locale) {
  i18n.locale = locale
}

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#drawmote')
