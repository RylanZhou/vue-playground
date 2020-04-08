import Vue from 'vue'
import Vuex from 'vuex'

import todoApp from './modules/TodoApp'
import Game2048 from './modules/2048'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    todoApp,
    Game2048
  }
})
