<template>
  <div v-if="atoms[0].symbol!==''">
    <div class="instructions">

    </div>
    <table>
        <thead>
            <tr>
                <th></th>
                <th class="part">Intérieur</th>
                <th class="part">Faces</th>
                <th class="part">Arêtes</th>
                <th class="part">Sommets</th>
                <th class="result">Total</th>
                <th class="result">Masse</th>
                <th class="result">% (masse)</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(atom, index) in listAtoms" :key="index">
                <td class="symbol"
                  :style="{ color: atom.color }">
                  <span class="symbol">
                    {{ atom.symbol }}<sup v-if="atom.charge !== ''">{{ atom.charge }}</sup>
                  </span>
                </td>
                <td><input
                  v-model="table[index].interior"
                  @focus="restrictView({part: 'interior', element: atom.symbol})" /></td>
                <td><input
                  v-model="table[index].face"
                  @focus="restrictView({part: 'face', element: atom.symbol})" /></td>
                <td><input
                  v-model="table[index].edge"
                  @focus="restrictView({part: 'edge', element: atom.symbol})" /></td>
                <td><input
                  v-model="table[index].vertex"
                  @focus="restrictView({part: 'vertex', element: atom.symbol})" /></td>
                <td>{{ amount[index].total }}</td>
                <td>{{ amount[index].mass }}</td>
                <td>{{ amount[index].percent | precision(1) }}</td>
            </tr>
        </tbody>
    </table>
    <div class="statistics">
      Masse volumique calculée : {{ density | precision(3) }} g/cm<sup>3</sup> <br />
      Compacité calculée : {{ compacity | precision(1) }} % (volume)
      Pourcentage d'hydratation : {{ hydration | precision(2) }} % (masse)
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Mutations from '../mutations'
import { AtomProps, FormulaRestrictedView } from '../utils/types'
import { molarMass } from '../utils/atoms'

interface UnitcellPart {
  interior: string
  vertex: string
  edge: string
  face: string
}
interface Computation {
  total: number,
  mass: number,
  percent: number
}

function castInt (s: string) {
  const v = parseInt(s)
  return (isNaN(v)) ? 0 : v
}

const avogadroNumber = 6.02214076E23

export default Vue.extend({
  name: 'FormulaTable',
  filters: {
    precision: function (value: number, toPrecision: number) {
      if (isNaN(value)) return ''
      return value.toFixed(toPrecision)
    }
  },
  data: function () {
    return {
      table: [] as UnitcellPart[]
    }
  },
  computed: {
    atoms: function () {
      return this.$store.state.atoms as AtomProps[]
    },
    listAtoms: function () {
      // @ts-ignore
      return this.atoms.map((atom: AtomProps) => {
        return {
          symbol: atom.symbol,
          charge: (atom.charge === 0) ? '' : (Math.abs(atom.charge) === 1 ? '' : Math.abs(atom.charge)) + ((atom.charge < 0) ? '-' : '+'),
          color: atom.color
        }
      })
    },
    amount: function () {
      let overallMass = 0
      const amount: {mass: number, total: number}[] = this.table.map((row: UnitcellPart, i: number) => {
        const occupancy = this.atoms[i].occupancy
        const total = occupancy * (castInt(row.interior) + castInt(row.face) / 2 + castInt(row.edge) / 4 + castInt(row.vertex) / 8)
        const mass = molarMass[this.atoms[i].symbol] * total
        overallMass += mass
        return {
          total,
          mass
        }
      })
      return amount.map(row => {
        return {
          ...row,
          percent: row.mass / overallMass * 100
        }
      }) as {total: number, mass: number, percent: number}[]
    },
    density: function () {
      // @ts-ignore
      const m = this.amount.reduce((acc: number, row: {total: number, mass: number, percent: number}) => {
        return acc + row.mass
      }, 0)
      return m / (this.$store.state.unitcellProp.volume * avogadroNumber * 10E-25)
    },
    compacity: function () {
      // @ts-ignore
      const v = this.amount.reduce((acc: number, row: {total: number, mass: number, percent: number}, i: number) => {
        return acc + row.total * 4 / 3 * Math.PI * Math.pow(this.atoms[i].ionicRadius, 3)
      }, 0)
      return v / this.$store.state.unitcellProp.volume * 100
    },
    hydration: function () {
      // @ts-ignore
      const ixH = this.atoms.findIndex((atom: AtomProps) => {
        return atom.symbol === 'H'
      })
      if (ixH === -1) return 0

      // @ts-ignore
      const nbH = this.amount[ixH].total
      return nbH * (molarMass['H'] + molarMass['O'])
    }
  },
  watch: {
    atoms (cur: AtomProps[], prev) {
      this.table = cur.map(atom => {
        return {
          interior: '',
          vertex: '',
          edge: '',
          face: ''
        }
      })
    }
  },
  methods: {
    restrictView (type: FormulaRestrictedView) {
      this.$store.commit(Mutations.RESTRICT_VIEW, type)
    }
  }
})
</script>

<style scoped>
input {
  width: 2em;
  border: none;
  text-align: center;
  font-size: 1em;
}
table {
  border-collapse: collapse;
  table-layout: fixed;
  margin-top: 2rem;
}
th.part {
  font-size: 0.9rem;
  transform: rotate(-30deg) translate(5px,6px);
  max-width: 40px;
}
th.result {
  font-weight: normal;
  vertical-align: bottom;
  font-size: 0.8rem;
}
td {
  border: 1px solid #ddd;
  text-align: center;
  min-width: 30px;
}
td.symbol {
  border: transparent;
}
span.symbol {
  background: #0c1d24;
  font-weight: bold;
  border-radius: 2px;
  display: inline-block;
  font-size: 1rem;
  width: 40px;
  margin-right: 2px;
}
span.symbol sup {
  font-size: 0.7rem
}
</style>
