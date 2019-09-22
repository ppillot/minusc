<template>
  <div>
    <div class="instructions">

    </div>
    <table>
        <thead>
            <tr>
                <th>Entités</th>
                <th>Intérieur</th>
                <th>Faces</th>
                <th>Arêtes</th>
                <th>Sommets</th>
                <th>Total</th>
                <th>Masse</th>
                <th>% (masse)</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(atom, index) in atoms" :key="index">
                <td>{{ atom.symbol }}</td>
                <td><input v-model="table[index].interior" /></td>
                <td><input v-model="table[index].face" /></td>
                <td><input v-model="table[index].edge" /></td>
                <td><input v-model="table[index].vertex" /></td>
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
import { AtomProps } from '../utils/types'
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
      const m = this.amount.reduce((acc: number, row: {total: number, mass: number, percent: number}) => {
        return acc + row.mass
      }, 0)
      return m / (this.$store.state.unitcellProp.volume * avogadroNumber * 10E-25)
    },
    compacity: function () {
      const v = this.amount.reduce((acc: number, row: {total: number, mass: number, percent: number}, i: number) => {
        return acc + row.total * 4 / 3 * Math.PI * Math.pow(this.atoms[i].ionicRadius, 3)
      }, 0)
      return v / this.$store.state.unitcellProp.volume * 100
    },
    hydration: function () {
      const ixH = this.atoms.findIndex((atom: AtomProps) => {
        return atom.symbol === 'H'
      })
      if (ixH === -1) return 0

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
  }
})
</script>

<style scoped>
input {
  width: 2em;
  border: none;
  text-align: right;
  font-size: 1em;
}
</style>
