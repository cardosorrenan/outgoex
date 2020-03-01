<template>
  <div class="body">
    <div class='home'>
      <div class="row">
        <div class="home-box">
          <small>Your all expenses: </small>
          <div class="money" v-money-format="totals.totalSpent"/>
          <small>in {{ this.expenses.length }} purchases</small>
        </div>
        <div class="home-box">
          <small>The average: </small>
          <div class="money" v-money-format="totals.average"/>
        </div>
        <div class="home-box">
          <small>The biggest expense was: </small>
          <div class="money" v-money-format="totals.biggest.value"/>
          <small class="date" v-date-format="totals.biggest.createdAt"/>
        </div>
        <div class="home-box">
          <small>The lowest expense was: </small>
          <div class="money" v-money-format="totals.lowest.value"/>
          <small class="date" v-date-format="totals.lowest.createdAt"/>
        </div>
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
  computed: {
    totals () {
      const exp = this.expenses
      const values = {
        totalSpent: 0,
        average: 0,
        biggest: {},
        lowest: {}
      }
      if (exp.length) {
        values.totalSpent = exp.map(e => +e.value)
          .reduce((acc, cur) => acc + cur, 0)
        values.average = values.totalSpent / exp.length
        values.biggest = exp.sort((a, b) => +b.value - +a.value)[0]
        values.lowest = exp.sort((a, b) => +a.value - +b.value)[0]
      }
      return values
    }
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)
      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.keys(values).map(i => values[i])
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
  .body {
    display: flex;
    justify-content: center;
  }
  .home {
    padding: 14px;
    display: flex;
    flex-direction: row;
    width: 100%;
    .home-box {
      width: 100%;
      display: flex;
      font-size: 20pt;
      flex-direction: row;
      height: 150px;
      align-items: center;
      justify-content: flex-start;
      border: 1px solid $light-medium;
      padding-left: 5vw;
      small {
        font-size: 1.3rem;
      }
      .money {
        color: $dark;
        padding: 0 1vw 0 1vw;
        margin: 0 1vw 0 1vw;
        background-color: rgba(0,0,0,0.2)
      }
      .date {
        font-size: 0.8rem;
        color: $dark-low;
      }
      &:nth-child(1), &:nth-child(2), &:nth-child(3) {
        border-bottom: none;
      }
      &:hover {
        transition: 0.5s;
        background-color: $light-medium;
      }
    }
  }
</style>
