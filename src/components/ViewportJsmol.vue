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
  HBondDisplay,
  PolyhedraDisplay } from '../utils/types'

let jmolObj: JmolWrapper

export default Vue.extend({
  name: 'ViewportJsmol',
  computed: mapState([
    'fileName',
    'solidType',
    'atomDisplay',
    'bondDisplay',
    'hbondDisplay',
    'polyhedraDisplay']),
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
    },
    polyhedraDisplay (curr: PolyhedraDisplay) {
      let spt = ''
      switch (curr) {
        case 'plain':
          spt = `if ({not selected}.size>0);
            polyhedra bonds (selected) noedges;
          else;
            polyhedra bonds (selected and charge>=0) noedges;
          endif;
          color polyhedra opaque;`
          break
        case 'translucent':
          spt = `if ({not selected}.size>0);
              polyhedra bonds (selected) noedges;
            else;
              polyhedra bonds (selected and charge>=0) noedges;
            endif;
            color polyhedra translucent;`
          break
        case 'collapsed':
          spt = `if ({not selected}.size>0);
              polyhedra bonds (selected) collapsed faceCenterOffSet=0.0 edges;
            else;
              polyhedra bonds (selected and charge>=0) collapsed faceCenterOffSet=0.0 edges;
            endif;
            color polyhedra opaque;`
          break
        case 'none':
          spt = 'polyhedra off'
          break
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
