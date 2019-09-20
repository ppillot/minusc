<template>
  <div class="command__button__set">
    <fieldset>
        <legend>
            Restreindre l'affichage de la maille
        </legend>
        <div class="button--big" @click="restrictView('interior')">
            <img src="img/centre.png" />
            <br> <b>I</b>ntérieur de la maille
        </div>
        <div class="button--big" @click="restrictView('face')">
            <img src="img/face.png" />
            <br> <b>F</b>aces
        </div>
        <div class="button--big" @click="restrictView('edge')">
            <img src="img/arete.png" />
            <br> <b>A</b>rêtes
        </div>
        <div class="button--big" @click="restrictView('vertex')">
            <img src="img/sommet.png" />
            <br> <b>S</b>ommets
        </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Mutations from '../mutations'
import { FormulaRestrictedView } from '../utils/types'

export default Vue.extend({
  name: 'FormulaRestrict',
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
    restrictView (type: FormulaRestrictedView) {
      this.$store.commit(Mutations.RESTRICT_VIEW, type)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.command__button__set {
    .button--big {
        display: inline-block;
        font-size: 11px;
        cursor: pointer;
        text-align: center;
        margin: 10px 10px 0 10px;
        img {
            width: 100px;
            height: 100px;
            border: none;
            border-radius: 3px;
            box-shadow: 1px 1px 3px #aaa;
        }
    }
}
</style>
<style scoped>
b {
  font-weight: 900;
  color: #8E24AA;
}
</style>
