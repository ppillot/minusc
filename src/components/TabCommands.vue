<template>
  <div class="container">
    <commands-atom />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CommandsAtom from './Commands.Atom.vue'

export default Vue.extend({
  name: 'TabCommands',
  components: {
    CommandsAtom
  },
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {

  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  flex: 1 1;
}
</style>
