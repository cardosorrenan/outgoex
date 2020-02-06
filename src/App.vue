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

    <layout-logout v-if="isLogged" class="logout"/>
  </div>
</template>

<script>
import BaseLoading from './components/global/BaseLoading'
import LayoutNavigation from './components/layout/LayoutNavigation'
import LayoutLogout from './components/layout/LayoutLogout'

export default {
  name: 'App',
  components: {
    BaseLoading,
    LayoutNavigation,
    LayoutLogout
  },
  data: () => ({
    isLogged: false
  }),
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
  .container-fluid {
    z-index: 0;
  }
  .logout {
    position: absolute;
    z-index: 100;
    top: 5vh;
    right: 5vh;
  }
</style>
