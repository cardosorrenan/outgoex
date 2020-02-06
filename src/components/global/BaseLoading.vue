<template>
  <div v-if="visible" class="base-loading fa-4x">
    <i class="fas fa-search-dollar heartBeat"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: true
    }
  },
  created () {
    this.$root.$on('Loading::show', () => { this.visible = true })
    this.$root.$on('Loading::hide', () => { this.visible = false })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.base-loading {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $backgroundLoading;
}

.fa-search-dollar {
  color: $iconLoading;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

</style>
