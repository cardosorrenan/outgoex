<template>
  <div class='home'>
    <div class="row">
      <div class="col-6 home-box">
        <small>Your all expenses</small>
        <div class="money">$ 900.00</div>
        <small>in 98 purchases</small>
      </div>
      <div class="col-6 home-box">
        <small>The montly average</small>
        <div class="money">$ 1900.00</div>
      </div>
      <div class="col-6 home-box">
        <small>The biggest expense was</small>
        <div class="money">$ 90.00</div>
        <small>in 20/02/2020</small>
      </div>
      <div class="col-6 home-box">
        <small>The lowest expense was</small>
        <div class="money">$ 0.10</div>
        <small>in 19/02/2020</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    expenses: []
  }),
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)
      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.keys(values).map(i => values[i])
        console.log(this.expenses)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables';
  .h1 {
    color: $dark-medium;
  }
  .home {
    padding: 15px;
    .home-box {
      width: 100%;
      display: flex;
      font-size: 20pt;
      flex-direction: column;
      height: calc(50vh - 15px);
      align-items: center;
      justify-content: center;
      border: 1px solid $dark-medium;
      small {
        font-size: 1.3rem;
      }
      .money {
        color: $dark;
        padding: 0 1vw 0 1vw;
        background-color: rgba(0,0,0,0.2)
      }
      &:nth-child(2), &:nth-child(4) {
        border-left: none;
      }
      &:nth-child(3), &:nth-child(4) {
        border-top: none;
      }
    }
  }
</style>
