<template>
  <div id="app">

  <base-loading/>
  <router-view/>

  </div>
</template>

<script>
import BaseLoading from './components/global/BaseLoading'

export default {
  name: 'App',
  components: {
    BaseLoading
  },
  methods: {
    showLoading () {
      this.$root.$emit('Loading::show')
    }
  },
  mounted () {
    console.log(this.$firebase)
  }
}
</script>

<style lang="scss">
  @import './assets/scss/variables';
  #app {
    min-height: 100vh;
    background-color: $background;
  }
</style>
