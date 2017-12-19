import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import socket from './modules/socket'
import brush from './modules/brush'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    Socket: socket,
    Brush: brush
  },
  strict: debug
})

export default store
