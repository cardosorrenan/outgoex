<template>
  <form class='form-login'>
    <div class="card">
      <div class="card-header text-center">
        <h1>Control Everything!</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="E-mail">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Senha">
        </div>
        <button class="btn btn-primary btn-block">
          Enviar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {

}
</script>

<style>
  .form-login {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
  }
  .card {
    width: 25%;
  }
</style>
