<template>
  <button v-if="visible" class="btn btn-logout" @click="logout()">
    <i class="fa fa-sign-out-alt"/>
  </button>
</template>

<script>
export default {

  data () {
    return {
      visible: true
    }
  },
  created () {
    this.$root.$on('Logout::show', () => { this.visible = true })
    this.$root.$on('Logout::hide', () => { this.visible = false })
  },
  methods: {
    async logout () {
      this.$root.$emit('Logout::hide')
      this.$root.$emit('Loading::show')
      await this.$firebase.auth().signOut()
      this.$router.push({ name: 'login' })
      this.$root.$emit('Loading::hide')
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/scss/variables';

  .btn-logout {
    opacity: 1;
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: rgba(05,34,40,1);
    transition: 0.4s;
    background-color: $light;
    border: 5px solid $light;
    border-radius: 100px !important;
    &:hover {
      color: $dark;
      transition: 0.4s;
      background-color: $light-yellow;
      border: 5px solid $light-yellow;
    }
  }
</style>
