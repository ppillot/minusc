<template>
  <div class="controls">
      <ul class="tabs">
          <li data-tab="files">Fichiers</li>
          <li data-tab="commands" class="active">Commandes</li>
          <li data-tab="formula">Formule</li>
      </ul>
      <div class="tab__content">
          <div>Fichiers</div>
          <div>Commandes</div>
          <div>Formule</div>
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
  background: white;
  flex: 1 1;
  display: flex;
  flex-direction: column;
}
ul.tabs {
    flex: 0 0;
    margin: 0;
    list-style: none;
    padding: 0;
    border-bottom: 1px solid #90a4ae;
    li {
        display: inline-block;
        padding: 0.2rem 0.5rem;
        border-width: 1px;
        border-color: #90A4AE;
        border-style: solid;
        margin: 0 0 -1px 0.4rem;
        border-radius: 3px 3px 0 0;
        &.active {
          border-bottom-color: white;
        }
    }
}
.tab__content {
    flex: 1 1;
    background: white;
    padding: 0.4rem;
}
</style>
