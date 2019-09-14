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
import Mutations from '../mutations'

let jmolObj: JmolWrapper

export default Vue.extend({
  name: 'ViewportJsmol',
  computed: mapState([
    'fileName',
    'initScript',
    'solidType',
    'atomDisplay',
    'bondDisplay',
    'hbondDisplay',
    'polyhedraDisplay',
    'backgroundIsDark',
    'showAxis',
    'showCharges',
    'unitcell',
    'isLoading']),
  watch: {
    fileName (curr: string, prev) {
      jmolObj.scriptAsync(`load ../cif/${curr} {3,3,3};
      ${this.initScript};
      restrict none;
      select all; color cpk; spacefill 20%; wireframe 0.15;
      color selectionHalos none;
      unitcell {1 1 1} dotted; display cell={1 1 1};
      set selectionHalos off;
      set axes 3;
      zoom 200;
      set zshade on; set zshadepower 2;`)
        .then(() => {
          let elements = jmolObj.getValue('{unitcell}.element') as string[]
          let elementSet = new Set(elements)
          elements = [...elementSet]

          let atoms = elements.map(el => {
            const spt = `{_${el}}[0].symbol + '|' + {_${el}}[0].charge + '|' + {_${el}}.occupancy + '|' + {_${el}}[0].ionic + '|' + {_${el}}[0].color`
            const r = jmolObj.getValue(spt)
            const pieces = r.split('|')
            const color = pieces[4].split(' ').join(', ').substring(1, pieces[4].length + 1)
            return {
              unitVolume: null,
              unitMass: null,
              unitCharge: null,
              unitNb: null,
              symbol: pieces[0],
              charge: Number.parseFloat(pieces[1]),
              occupancy: Number.parseFloat(pieces[2]),
              ionicRadius: Number.parseFloat(pieces[3]),
              color: `rgb(${color})`
            }
          })

          this.$store.commit(Mutations.SET_ATOMS, atoms)
          this.$store.commit(Mutations.LOADING_FINISHED)
        })
    },
    atomDisplay (curr: AtomDisplay) {
      if (this.isLoading) return

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
      if (this.isLoading) return

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
      if (this.isLoading) return

      let spt = 'hbonds off'
      if (curr === 'hbond') {
        spt = 'calculate hbonds; hbonds on;'
      }
      jmolObj.script(spt)
    },
    polyhedraDisplay (curr: PolyhedraDisplay) {
      if (this.isLoading) return

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
    },
    backgroundIsDark (cur: boolean) {
      const spt = cur ? 'background [x263238]' : 'background white'
      jmolObj.script(spt)
    },
    showAxis (cur: boolean) {
      const spt = cur ? 'set axes 3; set unitcell dotted' : 'axes off; unitcell off'
      jmolObj.script(spt)
    },
    showCharges (cur: boolean) {
      const spt = cur ? 'color label white; label %[charge]' : 'label off'
      jmolObj.script(spt)
    },
    unitcell (cur: {a: number, b: number, c: number}) {
      if (this.isLoading) return

      const cells = []
      for (let x = 0; x < cur.a; x++) {
        if (cur.a === 1) x = 1
        for (let y = 0; y < cur.b; y++) {
          if (cur.b === 1) y = 1
          for (let z = 0; z < cur.c; z++) {
            if (cur.c === 1) z = 1
            cells.push(`{${x} ${y} ${z} }`)
          }
        }
      }

      let spt = 'display ' + cells.map(cell => `cell=${cell}`).join(' or ')
      spt += `; zoomto 0.6 {displayed} 100;`

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
