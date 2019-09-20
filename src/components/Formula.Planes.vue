<template>
  <div class="command__button__set">
    <fieldset>
        <legend>
            Montrer/Cacher limites de maille
        </legend>
        <div class="button--big" @click="planeView('back')">
            <img src="img/planb.png" />
            <br> Maille ouverte
        </div>
        <div class="button--big" @click="planeView('all')">
            <img src="img/plans.png" />
            <br> Maille fermée
        </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Mutations from '../mutations'
import { FormulaPlaneView } from '../utils/types'

export default Vue.extend({
  name: 'FormulaPlanes',
  methods: {
    planeView (type: FormulaPlaneView) {
      this.$store.commit(Mutations.PLANE_VIEW, type)
    }
  }
})
</script>
