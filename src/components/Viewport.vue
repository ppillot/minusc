<template>
  <div class="viewport">
    <viewport-jsmol />
    <status />
    <unitcell-info />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ViewportJsmol from './ViewportJsmol.vue'
import Status from './Status.vue'
import UnitcellInfo from './UnitcellInfo.vue'

export default Vue.extend({
  name: 'Viewport',
  components: {
    ViewportJsmol,
    Status,
    UnitcellInfo
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
.info {
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
    background: rgba(85, 99, 105, 0.4);
    color: white;
    padding: 0.5em;
}
</style>
