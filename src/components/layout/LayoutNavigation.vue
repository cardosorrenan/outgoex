<template>
  <ul class="nav flex-column">

    <logo/>

    <router-link
      exact
      exact-active-class="active"
      :key='i'
      class="nav-link heartBeat"
      :to="{ name: router.name }"
      v-for="(router, i) in routerLinks"
    >
      <i class='icon-menu fa fa-angle-right'/>
      {{ router.meta.title }}
    </router-link>

    <hr>

    <layout-new-expense/>

  </ul>
</template>

<script>
import Logo from '../global/Logo'
import LayoutNewExpense from './LayoutNewExpense'

export default {
  name: 'navigation',
  components: {
    Logo,
    LayoutNewExpense
  },
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(r => r.name !== 'login')
    }
  }

}
</script>

<style lang="scss">
  @import '../../assets/scss/variables';

  .nav {
    padding-top: 5vh;
    align-items: center;
    justify-content: center;
  }
  .nav-link {
    width: 16.666vw;
    max-width: 16.666vw;
    color: $light;
    transition: 0.4s;
    &:hover {
      color: $dark;
      background-color: $light-yellow;
      .icon-menu {
        transition: 1s;
        color: $dark !important;
      }
    }
    .icon-menu {
      margin-right: 1vw;
      color: $light;
    }

  }
</style>
