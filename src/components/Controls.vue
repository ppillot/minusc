<template>
  <div class="controls">
      <ul>
          <li data-tab="files">Fichiers</li>
          <li data-tab="commands">Commandes</li>
          <li data-tab="formula">Formule</li>
      </ul>
      <div>

      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Controls'
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.controls {
  background: yellow;
  flex: 1 1;
}
</style>
