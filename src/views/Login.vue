<template>
  <form @submit.prevent="Login()" class='form-login'>
    <div class="card">

      <div class="card-body">
        <logo/>
        <div class="form-group">
          <input
            v-model="email"
            required
            type="email"
            class="form-control"
            placeholder="E-mail">
        </div>
        <div class="form-group">
          <input
            v-model="password"
            required
            type="password"
            class="form-control"
            placeholder="Password">
        </div>
        <i class="fas fa-search-dollar heartBeat fa-2x" v-if='loadingLogin'></i>
        <button v-if="!loadingLogin" class="btn btn-primary btn-block">
            Log in
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Logo from '../components/global/Logo'

export default {
  name: 'Login',
  components: {
    Logo
  },
  data: () => {
    return {
      email: 'renanhc96@gmail.com',
      password: 'admin20',
      loadingLogin: false
    }
  },
  methods: {
    async Login () {
      this.loadingLogin = true
      const { email, password } = this
      try {
        const response = await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        window.uid = response.user.uid
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
      }
      this.loadingLogin = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables';

  .form-login {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
  .card {
    background-color: $backgroundLoading;
    width: 25%;
  }
  .form-control {
    background-color: $ligther;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn {
    color: $ligther;
    background-color: rgba(05,34,40,0.8);
    border: 0;
    transition: 0.8s;
    margin-bottom: 5vh;
  }
  .btn:hover {
    background-color: rgba(15,44,50,1);
  }
  .fa-directions {
    margin-left: 1vw;
  }
  .fa-search-dollar {
    margin-top: 2.5vh;
    margin-bottom: 2.5vh;
    color: $iconLoading;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
</style>
