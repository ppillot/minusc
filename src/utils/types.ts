export type AtomDisplay = 'bs'|'sphere'|'none'
export type BondDisplay = 'stick'|'wireframe'|'none'
export type SolidType = 'metal'|'ionic'|'molecular'|'covalent'
export type HBondDisplay = 'hbond'|'none'
export type PolyhedraDisplay = 'translucent'|'plain'|'collapsed'|'none'
export type BottomFrameContent = 'help'|'scripts'|'settings'
export interface UnitcellProp {
    a: number
    b: number
    c: number
    alpha: number
    beta: number
    gamma: number
    volume: number
  }