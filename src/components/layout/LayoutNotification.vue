<template>
  <div v-if="show" :class="`alert-${type}`" class="alert alert-dismissible fade show">
    {{ message }}
    <button @click="close()" type="button" class="close">
      <span>&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    message: '',
    type: 'danger'
  }),
  created () {
    this.$root.$on('Notification::show', payload => {
      this.show = true
      this.type = payload.type
      this.message = payload.message
      setTimeout(() => { this.close() }, payload.timeout || 2000)
    })
  },
  methods: {
    close () {
      this.message = ''
      this.type = 'danger'
      this.show = false
    }
  }
}
</script>

<style scoped>
  .alert {
    top: 5vh;
    left: 45%;
    max-width: 300px;
    min-height: 50px;
    max-height: 10vh;
    z-index: 10000;
    position: absolute;
  }
</style>
