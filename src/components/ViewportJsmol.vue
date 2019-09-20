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
  PolyhedraDisplay,
  UnitcellProp,
  FormulaRestrictedView,
  FormulaPlaneView} from '../utils/types'
import Mutations from '../mutations'

let jmolObj: JmolWrapper
function makeSpt (planes: string[][]) {
  return '(' +
    planes.map(pl => {
      return pl.join(' and ')
    }).join(') or (') +
    ')'
}

export default Vue.extend({
  name: 'ViewportJsmol',
  computed: {
    ...mapState([
      'fileName',
      'solidType',
      'atomDisplay',
      'bondDisplay',
      'hbondDisplay',
      'polyhedraDisplay',
      'backgroundIsDark',
      'showAxis',
      'showCharges',
      'isLoading',
      'formulaIsOn',
      'formulaDisplay',
      'formulaDisplayPlanes']),
    unitcellScript: function () {
      const u = this.$store.state.unitcell as {a: number, b: number, c: number}
      const cells = []
      for (let x = 0; x < u.a; x++) {
        if (u.a === 1) x = 1
        for (let y = 0; y < u.b; y++) {
          if (u.b === 1) y = 1
          for (let z = 0; z < u.c; z++) {
            if (u.c === 1) z = 1
            cells.push(`{${x} ${y} ${z} }`)
          }
        }
      }

      let spt = 'display ' + cells.map(cell => `cell=${cell}`).join(' or ')
      spt += `; zoomto 0.6 {displayed} 100;`
      return spt
    },
    // Note: different techniques could be envision for selecting the atoms
    // located at the unitcell interface. WITHIN offset distance from a plane
    // and fractional coordinates of atoms do not allow sufficient
    // rounding of the coordinates to include them in the proper set.
    // The only reliable method seems to be cell selection.
    defineSetsScript: function () {
      const vertices = []
      const edges = []
      const faces = []

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            const arr = [i, j, k]
            const tot = (i & 1) + (j & 1) + (k & 1)
            switch (tot) {
              case 0:
                vertices.push(arr)
                break
              case 1:
                edges.push(arr)
                break
              case 2:
                faces.push(arr)
                break
              default:
                // interior
            }
          }
        }
      }
      let spt = `define vertex (cell={1 1 1} and (${vertices.map(arr => {
        return `cell={${arr.join(' ')}}`
      }).join(' or ')}) );`
      spt += `define edge (cell={1 1 1} and (${edges.map(arr => {
        return `cell={${arr.join(' ')}}`
      }).join(' or ')}) and not vertex);`
      spt += `define face (cell={1 1 1} and (${faces.map(arr => {
        return `cell={${arr.join(' ')}}`
      }).join(' or ')}) and not edge and not vertex);`
      spt += `define interior (cell={1 1 1} and not vertex and not edge and not face)`
      return spt
    }
  },
  watch: {
    fileName (curr: string, prev) {
      jmolObj.scriptAsync(`load ../cif/${curr} {3,3,3};
      ${this.$store.state.initScript};
      restrict none;
      select all; color cpk; spacefill 20%; wireframe 0.15;
      color selectionHalos none;
      unitcell {1 1 1} dotted; display cell={1 1 1};
      set showUnitcellDetails false;
      set displayCellParameters false;
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
            const r = jmolObj.getValue(spt) as string
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

          /* get unitcell parameters
           * String of the form: a=8.0633, b=8.0633, c=8.0633, alpha=90, beta=90,
           * gamma=90 [{8.063300754642581 8.063300377321264 8.063299999999982},
           * {8.0633 0 0}, {0 8.063299999999991 0}, {0 0 8.063299999999982}]
           * volume=524.2500189961353
           */
          let r = jmolObj.getValue(`script('show unitcell')`) as string
          /*
            (\w+) captures word
            =     equal sign
            (     begin capture value
              \d+ number (int part)
              (?: begin non capture group for decimal part
                /.  the decimal separator
                \d+ the decimal numbers
              )?  non capturing group (decimal part) present 0 or once
            )     end capture value
          */
          const propReg = /(\w+)=(\d+(?:\.\d+)?)/g
          let unitcell: Partial<UnitcellProp> = {}
          let capture: RegExpExecArray|null
          while ((capture = propReg.exec(r)) !== null) {
            const prop = capture[1] as keyof UnitcellProp
            const val = capture[2]
            unitcell[prop] = Number.parseFloat(val)
          }
          this.$store.commit(Mutations.SET_UNITCELL_PROP, unitcell)

          // set the predefined sets
          jmolObj.script(this.defineSetsScript)
        })
    },
    atomDisplay (curr: AtomDisplay) {
      if (this.$store.state.isLoading) return

      let spt = ''
      switch (curr) {
        case 'sphere':
          spt = (this.$store.state.solidType === 'ionic') ? 'cpk ionic'
            : (this.$store.state.solidType === 'metal') ? 'cpk' : 'cpk'
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
      if (this.$store.state.isLoading) return

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
      if (this.$store.state.isLoading) return

      let spt = 'hbonds off'
      if (curr === 'hbond') {
        spt = 'calculate hbonds; hbonds on;'
      }
      jmolObj.script(spt)
    },
    polyhedraDisplay (curr: PolyhedraDisplay) {
      if (this.$store.state.isLoading) return

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
    unitcellScript (cur: {a: number, b: number, c: number}) {
      if (this.$store.state.isLoading || this.$store.state.formulaIsOn) return
      jmolObj.script(this.unitcellScript)
    },
    formulaIsOn (cur: boolean) {
      if (this.$store.state.isLoading) return
      if (cur) {
        jmolObj.script('display cell={1 1 1}; zoomto {displayed} 100;')
      } else {
        jmolObj.script(this.unitcellScript)
      }
    },
    formulaDisplay (cur: FormulaRestrictedView) {
      let spt = ''
      switch (cur) {
        case 'interior':
        case 'face':
        case 'edge':
        case 'vertex':
          spt = `display ${cur}`
          break
        default:
          spt = 'display {1 1 1}'
          break
      }
      jmolObj.script(spt)
    },
    formulaDisplayPlanes (cur: FormulaPlaneView) {
      if (this.$store.state.isLoading) return
      let spt = ''
      switch (cur) {
        case 'none':
          spt = `draw pl1 off;
          draw pl2 off;
          draw pl3 off;
          draw pl4 off;
          draw pl5 off;
          draw pl6 off;`
          break
        case 'back':
          spt = `draw pl1 off; draw pl2 off; draw pl3 off;
          draw pl4 off; draw pl5 off; draw pl6 off;
          draw pl1 plane {0 0 0/1} {1 0 0/1} {1/2 1 0};
          draw pl2 plane {0 0 0/1} {0 1 0/1} {0 1/2 1};
          draw pl3 plane {0 0 0/1} {0 0 1/1} {1 0 1/2};
          color $pl1 dodgerblue translucent 0.2;
          color $pl2 dodgerblue translucent 0.2;
          color $pl3 dodgerblue translucent 0.2;`
          break
        case 'all':
          spt = `draw pl1 plane {0 0 0/1} {1 0 0/1} {1/2 1 0/1};
          draw pl2 plane {0 0 0/1} {0 1 0/1} {0 1/2 1/1};
          draw pl3 plane {0 0 0/1} {0 0 1/1} {1 0 1/2};
          draw pl4 plane {1 1 1/1} {1 1 0/1} {0 1 1/2};
          draw pl5 plane {1 1 1/1} {0 1 1/1} {1/2 0 1};
          draw pl6 plane {1 1 1/1} {1 0 1/1} {1 1/2 0};
          color $pl1 dodgerblue translucent 0.2;
          color $pl2 dodgerblue translucent 0.2;
          color $pl3 dodgerblue translucent 0.2;
          color $pl4 dodgerblue translucent 0.2;
          color $pl5 dodgerblue translucent 0.2;
          color $pl6 dodgerblue translucent 0.2;`
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
