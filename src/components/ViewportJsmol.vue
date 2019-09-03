<template>
  <div class="jsmol">
    <iframe src="jsmol/jsmol.htm" id="jsmol-viewport"></iframe>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ViewportJsmol'
})
</script>

<style scoped lang="scss">
.jsmol {
    background: #888;
    flex: 1 1;
}
#jsmol-viewport {
  height: 100%;
  width: 100%;
}
</style>
