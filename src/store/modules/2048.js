const TYPES = {
  GAME_OVER: 'GAME_OVER',
  RESET: 'RESET',
  ADD: 'ADD'
}

export default {
  namespaced: true,

  state: {
    score: 0,
    bestScore: 0,
    isGameover: false
  },

  mutations: {
    [TYPES.GAME_OVER](state) {
      state.isGameover = true
    },
    [TYPES.RESET](state) {
      state.isGameover = false
      state.score = 0
    },
    [TYPES.ADD](state, newScore) {
      state.score += newScore
      state.bestScore = Math.max(state.score, state.bestScore)
    }
  },

  getters: {
    isGameover(state) {
      return state.isGameover
    },
    score(state) {
      return state.score
    },
    bestScore(state) {
      return state.bestScore
    }
  },

  actions: {
    setGameover({ commit }) {
      commit(TYPES.GAME_OVER)
    },
    resetGameover({ commit }) {
      commit(TYPES.RESET)
    },
    addScore({ commit }, newScore) {
      commit(TYPES.ADD, newScore)
    }
  }
}
