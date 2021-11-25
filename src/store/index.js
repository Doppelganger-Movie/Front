import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserId:null,
    Username: null,
    // VDoppleganger : null,
    Selfurl : null,
  },
  getters: {
  },
  mutations: {
    SAVE_USERID: function (state, result) {
      state.UserId = result
    },
    SAVE_USERNAME : function (state, result) {
      state.Username = result
    },
    DELETE_USER_ID : function(state) {
      state.UserId = null
      state.Username = null
    },
    SAVE_SELF_URL : function (state, result) {
      state.Selfurl = result
    }
  },
  actions: {
    saveUserId : function ({commit}, userId) {
      commit('SAVE_USERID', userId)
    },
    saveUsername: function({commit}, username) {
      commit('SAVE_USERNAME', username)
    },
    deleteUserId: function ({commit}) {
      commit('DELETE_USER_ID')
    },
    saveSelfurl({commit}, imgurl) {
      commit('SAVE_SELF_URL', imgurl)
    }
  },
})
