<template>
  <div class="jsmol"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import JmolWrapper from '../utils/jmol.wrapper'
import { mapState } from 'vuex'

let jmolObj: JmolWrapper

export default Vue.extend({
  name: 'ViewportJsmol',
  computed: mapState(['fileName']),
  watch: {
    fileName (curr, prev) {
      jmolObj.script(`load ../cif/${curr} {1 1 1}`)
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
