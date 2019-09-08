import Vue from 'vue'
import Vuex from 'vuex'
import Mutations from './mutations'
import { AtomDisplay,
  HBondDisplay,
  BondDisplay,
} from './utils/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileName: 'sio2.cif',
    solidType: 'ionic',
    atomDisplay: 'bs',
    bondDisplay: 'stick',
    hbondDisplay: 'off'
  },
  mutations: {
    [Mutations.CHANGE_FILE]: function (state, fileName: string) {
      state.fileName = fileName
    },
    [Mutations.ATOM_DISPLAYED]: function (state, style: AtomDisplay) {
      state.atomDisplay = style
    },
    [Mutations.BOND_DISPLAYED]: function (state, style: BondDisplay) {
      state.bondDisplay = style
      if (style === 'none') {
        state.hbondDisplay = 'none'
      }
    },
    [Mutations.HBOND_DISPLAYED]: function (state, style: HBondDisplay) {
      state.hbondDisplay = style
    }

  },
  actions: {

  }
})
