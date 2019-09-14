/* eslint-disable no-multi-spaces */

export enum Mutations {
    ATOM_DISPLAYED      = 'atomDisplayed',
    CHANGE_FILE         = 'changeFile',
    BOND_DISPLAYED      = 'bondDisplayed',
    HBOND_DISPLAYED     = 'hbondDisplayed',
    POLYHEDRA_DISPLAYED = 'polyhedraDisplayed',
    TOGGLE_AXIS         = 'toggleAxis',
    TOGGLE_CHARGES      = 'toggleCharges',
    TOGGLE_SCRIPTS      = 'toggleScripts',
    TOGGLE_BGCOLOR      = 'toggleBgColor',
    TOGGLE_SETTINGS     = 'toggleSettings',
    SET_ATOMS           = 'setAtoms',
    SET_UNITCELLS       = 'setUnitcells',
    LOADING_FINISHED    = 'loadingFinished',
    SET_UNITCELL_PROP   = 'setUnitCellProp'
}

export default Mutations
