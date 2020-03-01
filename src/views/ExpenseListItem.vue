<template class="container">
  <div class="expense-list-item row">

    <div class="col-8 description">
      <span>{{ data.description }}</span>
      <small v-date-format="data.createdAt"/>
    </div>

    <div class="col-4 row">
      <div v-if="data.urlFile" class="show-file">
        <button @click="openReceipt()" class="btn btn-sm btn-outline-primary">
          Show receipt
          <i class="fas fa-external-link-square-alt"></i>
        </button>
      </div>
      <div v-else class="show-file">
        <button class="btn btn-sm disabled" disabled>
          Show receipt
          <i class="fas fa-external-link-square-alt"></i>
        </button>
      </div>
      <div v-money-format="data.value"/>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, required: true }
  },
  methods: {
    openReceipt () {
      window.open(this.data.urlFile, '_blank')
    }
  }
}
</script>
<style scoped lang="scss">
  @import '../assets/scss/variables';

  .expense-list-item {
    max-height: 100vh;
    transition: 0.4s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    border-bottom: 1px solid $light-medium;
    &:hover {
      background-color: $light-medium;
    }
  }
  .description {
    display: flex;
    flex-direction: column;
  }
  .btn {
    margin: 0px;
    font-size: 8pt;
  }
  .disabled {
    color: transparent;
    background-color: transparent;
    cursor: default;
  }

  .show-file {
    margin-right: 20px;
  }

  .fas {
    margin-left: 5px;
  }

</style>
