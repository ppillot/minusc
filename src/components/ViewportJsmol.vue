<template>
  <div class="jsmol"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import JmolWrapper from '../utils/jmol.wrapper'
import { mapState } from 'vuex'
import { AtomDisplay } from '../utils/types'

let jmolObj: JmolWrapper

export default Vue.extend({
  name: 'ViewportJsmol',
  computed: mapState(['fileName', 'solidType', 'atomDisplay']),
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
