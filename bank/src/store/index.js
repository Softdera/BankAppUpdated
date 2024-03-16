import { createStore } from 'vuex'

export default createStore({
  state: {
    Balance : 4000

  },
  getters: {
  },
  mutations: {
    updateBalance(state, newBalance) {
      state.Balance = newBalance;}
  },
  actions: {
  },
  modules: {
  }
})
