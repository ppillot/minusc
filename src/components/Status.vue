<template>
  <div class="status">
    <span class="title">{{ name }}</span>
    <span class="atom"
      v-for="atom in listAtoms"
      :style="{ color: atom.color }"
      :key='atom.symbol'>
      {{ atom.symbol }}<sup v-if="atom.charge !== ''">{{ atom.charge }}</sup>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { atomName } from '../utils/atoms'

interface AtomProps {
  charge: number,
  color: string,
  ionicRadius: number,
  occupancy: number,
  symbol: string,
  unitVolume: number,
  unitCharge: number,
  UnitNb: number,
  UnitMass: number
}

export default Vue.extend({
  name: 'Status',
  computed: {
    ...mapState(['name']),
    atoms: function () {
      return this.$store.state.atoms as AtomProps[]
    },
    listAtoms: function () {
      return this.atoms.map((atom) => {
        return {
          symbol: atom.symbol,
          charge: (atom.charge === 0) ? '' : Math.abs(atom.charge) + ((atom.charge < 0) ? '-' : '+'),
          name: atomName[atom.symbol],
          color: atom.color
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
.status {
    background: #0c1c24;
    flex: 0 0 120px;
    display: flex;
    color: white;
}
.title {
  font-size: 1.6rem;
  font-weight: bold;
}
.atom {
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0 0.2rem;
}
sup {
  font-size: 0.8rem;
}
</style>
