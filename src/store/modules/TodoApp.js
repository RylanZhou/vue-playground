const TYPES = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  TOGGLE: 'TOGGLE'
}

export default {
  state: {
    data: [
      { id: '45694', message: 'Take out the trash.', isCompleted: true },
      { id: '24763', message: 'Take out another trash.', isCompleted: false }
    ]
  },

  mutations: {
    [TYPES.ADD](state, message) {
      state.data = [
        {
          id: `${+new Date()}`,
          message,
          isCompleted: false
        },
        ...state.data
      ]
      console.log(state.data)
    },
    [TYPES.DELETE](state, id) {
      state.data = [...state.data.filter((each) => each.id !== id)]
    },
    [TYPES.TOGGLE](state, id) {
      const dataCopy = [...state.data]
      const target = dataCopy.find((each) => each.id === id)
      if (target) {
        target.isCompleted = !target.isCompleted
      }
      state.data = dataCopy
    }
  },

  actions: {
    addTodo({ commit }, message) {
      commit(TYPES.ADD, message)
    },
    deleteTodo({ commit }, id) {
      commit(TYPES.DELETE, id)
    },
    toggleComplete({ commit }, id) {
      commit(TYPES.TOGGLE, id)
    }
  }
}
