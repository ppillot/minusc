<template>
  <div class="container">
    <formula-restrict />
    <formula-planes />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import FormulaRestrict from './Formula.Restrict.vue'
import FormulaPlanes from './Formula.Planes.vue'

export default Vue.extend({
  name: 'TabFormula',
  components: {
    FormulaRestrict,
    FormulaPlanes
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  flex: 1 1;
}
</style>
