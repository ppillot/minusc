<template>
  <ul class="list">
      <li v-for="file in fileList" :key='file.name'>
          {{ file.name }}
      </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Files, { MinUScFile } from '../utils/files'

export default Vue.extend({
  name: 'TabFiles',
  data () {
    return {
      files: Files
    }
  },
  computed: {
    fileList: function () {
      const list: { name: string, id: number }[] = []
      Files.forEach((mFile, i) => {
        list.push({
          name: mFile.name,
          id: i
        })
        if (mFile.aliases) {
          list.push(...mFile.aliases.map((name) => {
            return {
              name,
              id: i
            }
          }))
        }
      })
      list.sort((a, b) => a.name.localeCompare(b.name))
      return list
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.controls {
  flex: 1 1;
  display: flex;
  flex-direction: column;
}
ul.tabs {
    flex: 0 0;
    margin: 0;
    list-style: none;
    padding: 0;
    border-bottom: 1px solid #90a4ae;
    li {
        display: inline-block;
        padding: 0.2rem 0.5rem;
        border-width: 1px;
        border-color: #90A4AE;
        border-style: solid;
        margin: 0 0 -1px 0.4rem;
        border-radius: 3px 3px 0 0;
        background: white;
        cursor: pointer;
        &.active {
          border-bottom-color: white;
        }
    }
}
.tab__content {
    flex: 1 1;
    background: white;
    padding: 0.4rem;
    &> div {
      display: none;
      &.active {
        display: flex;
      }
    }
}
</style>
