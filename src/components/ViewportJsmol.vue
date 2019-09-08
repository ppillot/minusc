<template>
  <div class="jsmol"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import JmolWrapper from '../utils/jmol.wrapper'
import { mapState } from 'vuex'
import {
  AtomDisplay,
  BondDisplay,
  HBondDisplay } from '../utils/types'

let jmolObj: JmolWrapper

export default Vue.extend({
  name: 'ViewportJsmol',
  computed: mapState(['fileName', 'solidType', 'atomDisplay', 'bondDisplay', 'hbondDisplay']),
  watch: {
    fileName (curr: string, prev) {
      jmolObj.script(`load ../cif/${curr} {1 1 1}`)
    },
    atomDisplay (curr: AtomDisplay) {
      let spt = ''
      switch (curr) {
        case 'sphere':
          spt = (this.solidType === 'ionic') ? 'cpk ionic'
            : (this.solidType === 'metal') ? 'cpk' : 'cpk'
          break
        case 'bs':
          spt = 'cpk 20%'
          break
        case 'none':
          spt = 'cpk off'
          break
      }
      jmolObj.script(spt)
    },
    bondDisplay (curr: BondDisplay) {
      let spt = ''
      switch (curr) {
        case 'stick':
          spt = 'wireframe 0.15'
          break
        case 'wireframe':
          spt = 'wireframe'
          break
        case 'none':
          spt = 'wireframe off'
          break
      }
      jmolObj.script(spt)
    },
    hbondDisplay (curr: HBondDisplay) {
      let spt = 'hbonds off'
      if (curr === 'hbond') {
        spt = 'calculate hbonds; hbonds on;'
      }
      jmolObj.script(spt)
    }
  },
  mounted () {
    jmolObj = new JmolWrapper(this.$el, {
      color: '#263238'
    })
  }
})
</script>

<style scoped lang="scss">
.jsmol {
    background: #888;
    flex: 1 1;
}

</style>
