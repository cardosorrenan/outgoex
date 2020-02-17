<template>
  <div :class="showModal ? 'app1' : 'app2'">

    <base-loading/>
    <layout-notification/>

    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <layout-navigation/>
        </div>
        <div class="col">
          <router-view/>
        </div>
        <div class="lateral-bar">
          <layout-logout v-if="isLogged" class="logout"/>
        </div>
      </div>

    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import BaseLoading from './components/global/BaseLoading'
import LayoutNotification from './components/layout/LayoutNotification'
import LayoutNavigation from './components/layout/LayoutNavigation'
import LayoutLogout from './components/layout/LayoutLogout'

export default {
  name: 'App',
  components: {
    BaseLoading,
    LayoutNotification,
    LayoutNavigation,
    LayoutLogout
  },
  data: () => ({
    isLogged: false,
    showModal: true
  }),
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user
      this.$router.push({ name: window.uid ? 'home' : 'login' })
      setTimeout(() => { this.$root.$emit('Loading::hide') }, 300)
    })
  },
  beforeUpdate () {
    if (this.$route.name === 'login') {
      this.showModal = true
    } else {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss">
  @import './assets/scss/variables';
  .app1 {
    min-height: 100vh;
    background-image: url('./assets/background.jpg');
    background-repeat:no-repeat;
    background-size: 100%;
    background-position: center center;
  }

  .app2 {
    min-height: 100vh;
    background-color: $ligther;
  }

  .navigation-sidebar {
    padding-left: 0px !important;
    min-height: 100vh;
    background-color: $backgroundLoading;
  }
  .container-fluid {
    z-index: 0;
  }

  .lateral-bar {
    display: flex;
    padding-top: 25px;
    justify-content: center;
    height: 100vh;
    background-color: $backgroundLoading;
    width: 90px;
  }
</style>
