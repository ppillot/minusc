import Vue from 'vue'
import Vuex from 'vuex'
import Mutations from './mutations'
import { AtomDisplay,
  HBondDisplay,
  BondDisplay,
  PolyhedraDisplay,
  BottomFrameContent,
  SolidType,
  UnitcellProp,
  FormulaRestrictedView,
  MinuscMode,
  FormulaPlaneView
} from './utils/types'
import { MinUScFile } from './utils/files'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileName: '',
    initScript: '',
    name: 'Quartz',
    solidType: 'ionic' as SolidType,
    atomDisplay: 'bs' as AtomDisplay,
    bondDisplay: 'stick' as BondDisplay,
    hbondDisplay: 'off' as HBondDisplay,
    polyhedraDisplay: 'none' as PolyhedraDisplay,
    showAxis: true,
    showCharges: false,
    backgroundIsDark: true,
    isLoading: false,
    formulaIsOn: false,
    formulaDisplay: { part: 'all' } as FormulaRestrictedView,
    formulaDisplayPlanes: 'none' as FormulaPlaneView,
    unitcell: {
      a: 1,
      b: 1,
      c: 1
    },
    unitcellProp: {
      a: 0,
      b: 0,
      c: 0,
      alpha: 0,
      beta: 0,
      gamma: 0,
      volume: 0
    },
    sidebar: {
      bottomFrame: 'help'
    },
    atoms: [{
      symbol: '',
      charge: 0,
      occupancy: 0,
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
      state.hbondDisplay = 'none'
      state.polyhedraDisplay = 'none'
      state.unitcell = {
        a: 1,
        b: 1,
        c: 1
      }
      state.formulaDisplayPlanes = 'none'
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
    },
    [Mutations.SET_UNITCELL_PROP]: function (state, prop: UnitcellProp) {
      state.unitcellProp = prop
    },
    [Mutations.SET_MODE]: function (state, mode: MinuscMode) {
      state.formulaIsOn = (mode === 'formula')
    },
    [Mutations.RESTRICT_VIEW]: function (state, view: FormulaRestrictedView) {
      state.formulaDisplay = view
    },
    [Mutations.PLANE_VIEW]: function (state, mode: FormulaPlaneView) {
      state.formulaDisplayPlanes = (mode === state.formulaDisplayPlanes)
        ? 'none'  // disable if already set
        : mode
    }
  },
  actions: {

  }
})
