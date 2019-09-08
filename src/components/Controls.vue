<template>
  <div class="controls">
      <ul class="tabs" @click="activate">
          <li data-tab="files" :class="{ active: activeTab == 'files'}">Fichiers</li>
          <li data-tab="commands" :class="{ active: activeTab == 'commands'}">Commandes</li>
          <li data-tab="formula"  :class="{ active: activeTab == 'formula'}">Formule</li>
      </ul>
      <div class="tab__content">
          <div :class="{ active: activeTab == 'files'}">
            <tab-files />
          </div>
          <div :class="{ active: activeTab == 'commands'}">Commandes</div>
          <div :class="{ active: activeTab == 'formula'}">Formule</div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TabFiles from './TabFiles.vue'

export default Vue.extend({
  name: 'Controls',
  components: {
    TabFiles
  },
  data () {
    return {
      activeTab: 'commands'
    }
  },
  methods: {
    activate: function (ev: MouseEvent) {
      const tabType = (ev.target as HTMLElement).dataset.tab
      console.log(tabType)
      if (!tabType) return
      this.activeTab = tabType
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.controls {
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
        background: white;
        cursor: pointer;
        &.active {
          border-bottom-color: white;
        }
    }
}
.tab__content {
    flex: 1 1;
    background: white;
    padding: 0.4rem;
    &> div {
      display: none;
      &.active {
        display: flex;
      }
    }
    overflow: auto;
}
</style>
