<template>
  <form @submit.prevent="Login()" class='form-login'>
    <div class="card">
      <div class="card-header text-center">
        <h6>Control everything!</h6>
      </div>
      <div class="card-body">
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
        <i class="fas fa-file-invoice-dollar tada fa-3x" v-if='loadingLogin'></i>
        <button v-if="!loadingLogin" class="btn btn-primary btn-block">
            Log in
            <i class="fas fa-directions"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
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

  .card-header {
    color: $dark-medium;
    background-color: $light-medium;
    padding-top: 5vh;
    padding-bottom: 5vh;
    margin-bottom: 0;
  }
  .form-login {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
  .card {
    width: 25%;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn {
    background-color: #053440;
    border: 0;
    margin-top: 5vh;
    transition: 0.8s;
    margin-bottom: 5vh;
  }
  .btn:hover {
    background-color: rgba(05,34,40,0.8);
  }
  .fa-directions {
    margin-left: 1vw;
  }
  .fa-file-invoice-dollar{
    margin-top: 5vh;
    margin-bottom: 5vh;
    color: $light-low;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
</style>
