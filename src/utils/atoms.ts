import { AtomicSymbol } from './types'

export const molarMass: {
  [k in AtomicSymbol]: number
} = {
  'H': 1.008,
  'He': 4.003,
  'Li': 6.941,
  'Be': 9.012,
  'B': 10.81,
  'C': 12.01,
  'N': 14.01,
  'O': 16.00,
  'F': 19,
  'Ne': 20.18,
  'Na': 22.99,
  'Mg': 24.31,
  'Al': 26.98,
  'Si': 28.09,
  'P': 30.97,
  'S': 32.07,
  'Cl': 35.45,
  'Ar': 39.95,
  'K': 39.10,
  'Ca': 40.08,
  'Sc': 44.96,
  'Ti': 47.87,
  'V': 50.94,
  'Cr': 52,
  'Mn': 54.94,
  'Fe': 55.84,
  'Co': 58.93,
  'Ni': 58.69,
  'Cu': 63.55,
  'Zn': 65.39,
  'Ga': 69.72,
  'Ge': 72.61,
  'As': 74.92,
  'Se': 78.96,
  'Br': 79.9,
  'Kr': 83.8,
  'Rb': 85.47,
  'Sr': 87.62,
  'Y': 88.91,
  'Zr': 91.22,
  'Nb': 92.21,
  'Mo': 95.94,
  'Tc': 99,
  'Ru': 101.07,
  'Rh': 102.91,
  'Pd': 106.42,
  'Ag': 107.87,
  'Cd': 112.41,
  'In': 114.82,
  'Sn': 118.71,
  'Sb': 121.76,
  'Te': 127.60,
  'I': 126.90,
  'Xe': 131.29,
  'Cs': 132.91,
  'Ba': 137.33,
  'Hf': 178.49,
  'Ta': 180.95,
  'W': 183.84,
  'Re': 186.21,
  'Os': 190.23,
  'Ir': 192.22,
  'Pt': 195.08,
  'Au': 196.97,
  'Hg': 200.59,
  'Tl': 204.38,
  'Pb': 207.2,
  'Bi': 208.98,
  'Po': 209,
  'At': 210,
  'Rn': 222,
  'Fr': 223,
  'Ra': 226,
  'Rf': 263,
  'Db': 262,
  'Sg': 266,
  'Bh': 264,
  'Hs': 269,
  'Mt': 268,
  'Ds': 272,
  'Rg': 272,
  'La': 138.91,
  'Ce': 140.12,
  'Pr': 140.91,
  'Nd': 144.24,
  'Pm': 145,
  'Sm': 150.36,
  'Eu': 151.96,
  'Gd': 157.25,
  'Tb': 158.93,
  'Dy': 162.50,
  'Ho': 164.93,
  'Er': 167.26,
  'Tm': 168.93,
  'Yb': 173.04,
  'Lu': 174.97,
  'Ac': 227,
  'Th': 232.04,
  'Pa': 231.04,
  'U': 238.03,
  'Np': 237,
  'Pu': 244,
  'Am': 243,
  'Cm': 247,
  'Bk': 247,
  'Cf': 251,
  'Es': 252,
  'Fm': 257,
  'Md': 258,
  'No': 259,
  'Lr': 262
}
export const atomName: { [k in AtomicSymbol]: string } = {
  'H': 'hydrogen',
  'He': 'helium',
  'Li': 'lithium',
  'Be': 'berylium',
  'B': 'bore',
  'C': 'carbon',
  'N': 'nitrogen',
  'O': 'oxygen',
  'F': 'fluorine',
  'Ne': 'neon',
  'Na': 'sodium',
  'Mg': 'magnesium',
  'Al': 'aluminium',
  'Si': 'silicon',
  'P': 'phosphorus',
  'S': 'sulfur',
  'Cl': 'chlorine',
  'Ar': 'argon',
  'K': 'potassium',
  'Ca': 'calcium',
  'Sc': 'scandium',
  'Ti': 'titanium',
  'V': 'vanadium',
  'Cr': 'chromium',
  'Mn': 'manganese',
  'Fe': 'iron',
  'Co': 'cobalt',
  'Ni': 'nickel',
  'Cu': 'copper',
  'Zn': 'zinc',
  'Ga': 'gallium',
  'Ge': 'germanium',
  'As': 'arsenic',
  'Se': 'selenium',
  'Br': 'bromine',
  'Kr': 'krypton',
  'Rb': 'rubidium',
  'Sr': 'strontium',
  'Y': 'yttrium',
  'Zr': 'zirconium',
  'Nb': 'niobium',
  'Mo': 'molybdenum',
  'Tc': 'technetium',
  'Ru': 'ruthenium',
  'Rh': 'rhodium',
  'Pd': 'palladium',
  'Ag': 'silver',
  'Cd': 'cadnium',
  'In': 'indium',
  'Sn': 'tin',
  'Sb': 'antimony',
  'Te': 'tellurium',
  'I': 'iodine',
  'Xe': 'xenon',
  'Cs': 'caesium',
  'Ba': 'barium',
  'Hf': 'hafnium',
  'Ta': 'tantalum',
  'W': 'tungsten',
  'Re': 'rhenium',
  'Os': 'osmium',
  'Ir': 'iridium',
  'Pt': 'platinum',
  'Au': 'gold',
  'Hg': 'mercury',
  'Tl': 'thallium',
  'Pb': 'lead',
  'Bi': 'bismuth',
  'Po': 'polonium',
  'At': 'astatine',
  'Rn': 'radon',
  'Fr': 'francium',
  'Ra': 'radium',
  'Rf': 'rutherfordium',
  'Db': 'dubnium',
  'Sg': 'seaborgium',
  'Bh': 'bohrium',
  'Hs': 'hassium',
  'Mt': 'meitnerium',
  'Ds': 'darmstadtium',
  'Rg': 'roentgenium',
  'La': 'lanthanum',
  'Ce': 'cerium',
  'Pr': 'praseodymium',
  'Nd': 'neodymium',
  'Pm': 'promethium',
  'Sm': 'samarium',
  'Eu': 'europium',
  'Gd': 'gadolinium',
  'Tb': 'terbium',
  'Dy': 'dysprosium',
  'Ho': 'holmium',
  'Er': 'erbium',
  'Tm': 'thulium',
  'Yb': 'ytterbium',
  'Lu': 'lutetium',
  'Ac': 'actinium',
  'Th': 'thorium',
  'Pa': 'protactinium',
  'U': 'uranium',
  'Np': 'neptunium',
  'Pu': 'plutonium',
  'Am': 'americium',
  'Cm': 'curium',
  'Bk': 'berkelium',
  'Cf': 'californium',
  'Es': 'einsteinium',
  'Fm': 'fermium',
  'Md': 'mendelevium',
  'No': 'nobelium',
  'Lr': 'lawrencium'
}
export const metallicRadius: Partial<{[k in AtomicSymbol]: number}> = {
  'Li': 1.52,
  'Be': 1.12,

  'Na': 1.86,
  'Mg': 1.6,
  'Al': 1.43,

  'K': 2.27,
  'Ca': 1.97,
  'Sc': 1.62,
  'Ti': 1.47,
  'V': 1.34,
  'Cr': 1.28,
  'Mn': 1.27,
  'Fe': 1.26,
  'Co': 1.25,
  'Ni': 1.24,
  'Cu': 1.28,
  'Zn': 1.34,
  'Ga': 1.35,

  'Rb': 2.48,
  'Sr': 2.15,
  'Y': 1.8,
  'Zr': 1.6,
  'Nb': 1.46,
  'Mo': 1.39,
  'Tc': 1.36,
  'Ru': 1.34,
  'Rh': 1.34,
  'Pd': 1.37,
  'Ag': 1.44,
  'Cd': 1.51,
  'In': 1.67,

  'Cs': 2.65,
  'Ba': 2.22,
  'La': 1.87,
  'Ce': 1.818,
  'Pr': 1.824,
  'Nd': 1.814,
  'Pm': 1.834,
  'Sm': 1.804,
  'Eu': 1.804,
  'Gd': 1.804,
  'Tb': 1.773,
  'Dy': 1.781,
  'Ho': 1.762,
  'Er': 1.761,
  'Tm': 1.759,
  'Yb': 1.76,
  'Lu': 1.738,
  'Hf': 1.59,
  'Ta': 1.46,
  'W': 1.39,
  'Re': 1.37,
  'Os': 1.35,
  'Ir': 1.355,
  'Pt': 1.385,
  'Au': 1.44,
  'Hg': 1.51,
  'Tl': 1.70,

  'Th': 1.79,
  'Pa': 1.63,
  'U': 1.56,
  'Np': 1.55,
  'Pu': 1.59,
  'Am': 1.73,
  'Cm': 1.74,
  'Bk': 1.70,
  'Cf': 1.86,
  'Es': 1.86
}

export default {
  atomName,
  molarMass,
  metallicRadius
}
