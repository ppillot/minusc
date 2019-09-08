<template>
  <div class="command__button__set">
    <fieldset>
        <legend>
            Afficher polyèdres
        </legend>
        <div class="button" @click="displayPoly('plain')">
            <img src="img/polyopaq.gif" />
            <br> Plein
        </div>
        <div class="button" @click="displayPoly('translucent')">
            <img src="img/polyhedre2.gif" />
            <br> Translucide
        </div>
        <div class="button" @click="displayPoly('collapsed')">
            <img src="img/polycoll.gif" />
            <br> Creux
        </div>
        <div class="button" @click="displayPoly('none')"><img src="img/noir.gif" />
            <br> Effacer
        </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Mutations from '../mutations'
import { PolyhedraDisplay } from '../utils/types'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'CommandsPolyedra',
  data () {
    return {
    }
  },
  methods: {
    displayPoly (type: PolyhedraDisplay) {
      this.$store.commit(Mutations.POLYHEDRA_DISPLAYED, type)
    }
  }
})
</script>
