import Vue from 'vue'
import Vuex from 'vuex'
import Mutations from './mutations'
import { AtomDisplay,
  HBondDisplay,
  BondDisplay,
  PolyhedraDisplay,
  BottomFrameContent
} from './utils/types'
import { MinUScFile } from './utils/files'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileName: 'sio2.cif',
    initScript: '',
    name: 'Quartz',
    solidType: 'ionic',
    atomDisplay: 'bs',
    bondDisplay: 'stick',
    hbondDisplay: 'off',
    polyhedraDisplay: 'none',
    showAxis: true,
    showCharges: false,
    backgroundIsDark: true,
    isLoading: false,
    unitcell: {
      a: 1,
      b: 1,
      c: 1
    },
    sidebar: {
      bottomFrame: 'help'
    },
    atoms: [{
      symbol: 'O',
      charge: -2,
      occupancy: 1,
      ionicRadius: 0,
      unitVolume: null,
      unitMass: null,
      unitCharge: null,
      unitNb: null,
      color: 'rgb(255, 13, 13)'
    }]
  },
  mutations: {
    [Mutations.CHANGE_FILE]: function (state, file: MinUScFile) {
      state.isLoading = true
      state.fileName = file.file
      state.name = file.name
      state.solidType = file.type || 'ionic'
      state.initScript = file.script || ''
      state.atomDisplay = 'bs'
      state.bondDisplay = 'stick'
      state.hbondDisplay = 'off'
      state.polyhedraDisplay = 'none'
      state.unitcell = {
        a: 1,
        b: 1,
        c: 1
      }
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
      state.showAxis = !state.showAxis
    },
    [Mutations.TOGGLE_CHARGES]: function (state) {
      state.showCharges = !state.showCharges
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
      state.backgroundIsDark = !state.backgroundIsDark
    },
    [Mutations.SET_ATOMS]: function (state, atoms) {
      state.atoms = atoms
    },
    [Mutations.SET_UNITCELLS]: function (state, dimensions: [number, number, number]) {
      state.unitcell = {
        a: dimensions[0],
        b: dimensions[1],
        c: dimensions[2]
      }
    },
    [Mutations.LOADING_FINISHED]: function (state) {
      state.isLoading = false
    }
  },
  actions: {

  }
})
