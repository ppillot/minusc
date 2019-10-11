<template>
  <div class="info" :style="visibility">
    <span class="title">{{ name }}</span>
    <ul>
        <li v-for="l in lengths" :key="l[0]">
            {{ l[0] }} = {{ l[1]|precision(1) }} pm
        </li>
        <li v-for="a in angles" :key="a[0]">
            {{ a[0] }} = {{ a[1] }}°
        </li>
        <li v-if="formulaIsOn">
          Compteur : {{ counter }}
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { UnitcellProp } from '../utils/types'

export default Vue.extend({
  name: 'UnitcellInfo',
  computed: {
    ...mapState(['name', 'counter', 'formulaIsOn']),
    lengths () {
      const prop = this.$store.state.unitcellProp as UnitcellProp
      return [
        ['a', prop.a * 100],
        ['b', prop.b * 100],
        ['c', prop.c * 100]
      ]
    },
    angles () {
      const prop = this.$store.state.unitcellProp as UnitcellProp
      return [
        ['α', prop.alpha],
        ['β', prop.beta],
        ['γ', prop.gamma]
      ]
    },
    visibility () {
      return this.$store.state.unitcellProp.volume === 0
        ? { visibility: 'hidden' }
        : { visibility: 'visible' }
    }
  },
  filters: {
    precision: function (value: number, toPrecision: number) {
      if (isNaN(value)) return ''
      return value.toFixed(toPrecision)
    }
  }
})
</script>

<style scoped lang="scss">
.info {
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  background: rgba(85, 99, 105, 0.4);
  color: white;
  padding: 0.5em;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
