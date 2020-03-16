import Vue from 'vue'
import Vuex from 'vuex'

import todoApp from './modules/TodoApp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    todoApp
  }
})
