<template>
  <div class="section">
    <h3 class="title is-3">Where do you live?</h3>
    <div class="select" :class="{ 'is-loading': loading }">
      <select        
        v-model="selected"
        @change="$emit('change', selected)">
        <option>Select a country</option>
        <option v-for="item in list" :key="item">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import agent from 'superagent'
export default {
  props: [
    'list',
    'default',
    'loading'
  ],
  data() {
    return {
      selected: this.default
    }
  },
  watch: {
    default(val) {
      this.selected = val
    }
  }
}
</script>


<style scoped>

</style>