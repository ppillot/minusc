import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileName: 'sio2.cif'
  },
  mutations: {
    changeFile: function (state, fileName) {
      state.fileName = fileName
    }

  },
  actions: {

  }
})
