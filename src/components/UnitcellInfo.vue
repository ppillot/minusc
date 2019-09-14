<template>
  <div class="info">
    <span class="title">{{ name }}</span>
    <ul>
        <li v-for="l in lengths" :key="l[0]">
            {{ l[0] }} = {{ l[1]|precision(1) }} pm
        </li>
        <li v-for="a in angles" :key="a[0]">
            {{ a[0] }} = {{ a[1] }}°
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
    ...mapState(['name']),
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
    }
  },
  filters: {
    precision: function (value: number, precision: number) {
      const intPart = Math.floor(value)
      const decimals = value - intPart
      if (decimals === 0) return `${value}.${'0'.repeat(precision)}`
      const roundedDecimals = Math.round(decimals * 10 ** precision)
      return `${intPart}.${roundedDecimals}`
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
