<template>
  <div id="app">

    <base-loading/>

    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <layout-navigation/>
        </div>
        <div class="col">
          <router-view/>
        </div>
      </div>
    </div>

    <router-view v-else/>

  </div>
</template>

<script>
import BaseLoading from './components/global/BaseLoading'
import LayoutNavigation from './components/layout/LayoutNavigation'

export default {
  name: 'App',
  components: {
    BaseLoading,
    LayoutNavigation
  },
  data: () => ({
    isLogged: false
  }),
  methods: {
    showLoading () {
      this.$root.$emit('Loading::show')
    }
  },
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user
      this.$router.push({ name: window.uid ? 'home' : 'login' })
      setTimeout(() => { this.$root.$emit('Loading::hide') }, 300)
    })
  }
}
</script>

<style lang="scss">
  @import './assets/scss/variables';
  #app {
    min-height: 100vh;
    background-color: $dark-medium;
  }
  .navigation-sidebar {
    padding-left: 0px !important;
    min-height: 100vh;
    background-color: $backgroundLoading;
  }
</style>
