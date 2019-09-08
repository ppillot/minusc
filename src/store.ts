import Vue from 'vue'
import Vuex from 'vuex'
import Mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileName: 'sio2.cif',
    solidType: 'ionic',
    atomDisplay: 'bs'
  },
  mutations: {
    [Mutations.CHANGE_FILE]: function (state, fileName: string) {
      state.fileName = fileName
    },
    [Mutations.ATOM_DISPLAYED]: function (state, style: string) {
      state.atomDisplay = style
    }

  },
  actions: {

  }
})
