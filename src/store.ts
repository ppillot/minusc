import Vue from 'vue'
import Vuex from 'vuex'
import Mutations from './mutations'
import { AtomDisplay,
  HBondDisplay,
  BondDisplay,
  PolyhedraDisplay,
  BottomFrameContent
} from './utils/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileName: 'sio2.cif',
    solidType: 'ionic',
    atomDisplay: 'bs',
    bondDisplay: 'stick',
    hbondDisplay: 'off',
    polyhedraDisplay: 'none',
    showAxis: true,
    showCharges: false,
    backgroundIsDark: true,
    sidebar: {
      bottomFrame: 'help'
    }
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
    },
    [Mutations.POLYHEDRA_DISPLAYED]: function (state, style: PolyhedraDisplay) {
      state.polyhedraDisplay = style
    },
    [Mutations.TOGGLE_AXIS]: function (state) {
      state.showAxis = ! state.showAxis
    },
    [Mutations.TOGGLE_CHARGES]: function (state) {
      state.showCharges = ! state.showCharges
    },
    [Mutations.TOGGLE_SCRIPTS]: function (state) {
      state.sidebar.bottomFrame = (state.sidebar.bottomFrame === 'scripts')
      ? 'help'
      : 'scripts'
    },
    [Mutations.TOGGLE_SETTINGS]: function (state) {
      state.sidebar.bottomFrame = (state.sidebar.bottomFrame === 'settings')
      ? 'help'
      : 'settings'
    },
    [Mutations.TOGGLE_BGCOLOR]: function (state) {
      state.backgroundIsDark = ! state.backgroundIsDark
    }
  },
  actions: {

  }
})
