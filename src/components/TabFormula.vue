<template>
  <div class="container">
    <formula-restrict />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import FormulaRestrict from './Formula.Restrict.vue'

export default Vue.extend({
  name: 'TabFormula',
  components: {
    FormulaRestrict
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  flex: 1 1;
}
</style>
