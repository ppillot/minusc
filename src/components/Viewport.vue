<template>
  <div class="viewport">
    <viewport-jsmol />
    <status />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ViewportJsmol from './ViewportJsmol.vue'
import Status from './Status.vue'

export default Vue.extend({
  name: 'Viewport',
  components: {
    ViewportJsmol,
    Status
  }
})
</script>

<style scoped lang="scss">
.viewport {
    background: #263238;
    flex: 1 1;
    display: flex;
    flex-direction: column;
}
</style>
