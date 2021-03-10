import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    isUserLoggedInAdm: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    },
    setIsUserLoggedIn (state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn
    },
    setIsUserLoggedInAdm (state, isUserLoggedInAdm) {
      state.isUserLoggedInAdm = isUserLoggedInAdm
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setIsUserLoggedIn ({commit}, isUserLoggedIn) {
      commit('setIsUserLoggedIn', isUserLoggedIn)
    },
    setIsUserLoggedInAdm ({commit}, isUserLoggedInAdm) {
      commit('setIsUserLoggedInAdm', isUserLoggedInAdm)
    }
  }
})
