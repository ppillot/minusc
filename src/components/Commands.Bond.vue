<template>
  <div class="command__button__set">
    <fieldset>
        <legend>
            Afficher liaisons
        </legend>
        <div class="button" @click="displayBond('stick')">
            <img src="img/baton.gif" />
            <br> Bâtonnets
        </div>
        <div class="button" @click="displayBond('wireframe')">
            <img src="img/fil2fer.gif" />
            <br> Fil de fer
        </div>
        <div class="button"
            v-if="solidType === 'molecular'"
            @click="displayHBond('hbond')">
            <img src="img/hbond.png" />
            <br> Liaison H
            </div>
        <div class="button" @click="displayBond('none')"><img src="img/noir.gif" />
            <br> Effacer
        </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Mutations from '../mutations'
import { BondDisplay, HBondDisplay } from '../utils/types'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'CommandsBond',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['solidType'])
  },
  methods: {
    displayBond (type: BondDisplay) {
      this.$store.commit(Mutations.BOND_DISPLAYED, type)
    },
    displayHBond (type: HBondDisplay) {
      this.$store.commit(Mutations.HBOND_DISPLAYED, type)
    }
  }
})
</script>
