<template>
  <div class="container">
    <commands-atom />
    <commands-bond />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CommandsAtom from './Commands.Atom.vue'
import CommandsBond from './Commands.Bond.vue'

export default Vue.extend({
  name: 'TabCommands',
  components: {
    CommandsAtom,
    CommandsBond
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
