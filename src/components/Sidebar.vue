<template>
  <div class="sidebar">
    <h1>MinUSc</h1>
    <controls />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Controls from './Controls.vue'

export default Vue.extend({
  name: 'Sidebar',
  components: {
    Controls
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidebar {
  background: white;
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
}
h1 {
  margin: 0.5rem;
  text-align: left;
}
</style>
