<template>
  <div class="logo">
    <div class="invertY">
      <i class="fas fa-frog icon-logo animated tada fa-1x"></i>
    </div>
    <div class="skewX">
      <h6 class="text-logo">Outgoex</h6>
    </div>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Delius+Unicase&display=swap');
  @import '../../assets/scss/variables';

  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 4vh;
    &:hover {
      .icon-logo {
        animation-duration: 1s !important;
        animation-iteration-count: infinite;
      }
    }
  }
  .icon-logo {
    color: $iconLoading;
    animation-duration: 30s !important;
    animation-iteration-count: infinite;
  }
  .invertY {
    transform: scale(-1,1);
  }
  .skewX {
    transform: skewX(-10deg);
  }
  .text-logo {
    font-family: 'Delius Unicase', cursive;
    font-size: 18pt;
    color: $ligther;
    transform:translateY(-5px);
  }

</style>
