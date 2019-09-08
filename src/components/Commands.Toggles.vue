<template>
  <div class="command__button__set">
    <fieldset>
        <legend>
            Activer/Désactiver
        </legend>
        <div class="button" @click="toggleAxis">
            <img src="img/axes.gif" />
            <br> Axes
        </div>
        <div class="button" @click="toggleCharges">
            <img src="img/plus_moins.png" />
            <br> Charges
        </div>
        <div class="button" @click="toggleScripts">
            <img src="img/form_text.gif" />
            <br> Entrer
            <br> Scripts
        </div>
        <div class="button" @click="toggleBgColor">
            <img src="img/contrast.png" />
            <br> Fond
        </div>
        <div class="button" @click="toggleSettings">
            <img src="img/reglages.png" />
            <br> Réglages
        </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Mutations from '../mutations'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'CommandsToggles',
  data () {
    return {
    }
  },
  methods: {
    toggleAxis () {
      this.$store.commit(Mutations.TOGGLE_AXIS)
    },
    toggleCharges () {
      this.$store.commit(Mutations.TOGGLE_CHARGES)
    },
    toggleScripts () {
      this.$store.commit(Mutations.TOGGLE_SCRIPTS)
    },
    toggleBgColor () {
      this.$store.commit(Mutations.TOGGLE_BGCOLOR)
    },
    toggleSettings () {
      this.$store.commit(Mutations.TOGGLE_SETTINGS)
    }
  }
})
</script>
