<template class="container">
  <div class="expense-list-item row">
    <div class="col-10">
      <div>{{ data.description }}</div>
      <small v-date-format="data.createdAt"/>
    </div>
    <div class="col-2" v-money-format="data.value"/>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, required: true }
  }
}
</script>
<style scoped lang="scss">
  @import '../assets/scss/variables';
  .expense-list-item {
    transition: 0.4s;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 50px;
    padding-right: 50px;
    border-bottom: 1px solid $light-medium;
    &:hover {
      background-color: $light-medium;
    }
  }
</style>
