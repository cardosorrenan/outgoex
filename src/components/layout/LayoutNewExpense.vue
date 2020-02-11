<template>
  <div class="w-100 d-flex justify-content-center">
    <button @click="modalVisibility()" class="btn btn btn-outline-prymary w-75">
      Novo Gasto
    </button>
    <form @submit.prevent="submit()">
      <div
        class="modal fade "
        :class="{show: showModal}"
        style="padding-right: 15px; display: block;"
        :style="{display: showModal ? 'block' : 'none'}"
      >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >Add new expense</h5>
            <button id="close-modal" type="button" @click="modalVisibility()" class="close" data-dismiss="modal" aria-label="Close">
              <i class="fas fa-external-link-square-alt"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group col-8">
                <label for="">Description: </label>
                <input v-model="form.description" type="text" class="form-control" required>
              </div>
               <div class="form-group col-4">
                <label for="">Value: </label>
                <input v-model="form.value" type="text" class="form-control" required>
              </div>
              <div class="form-group flex-column col-12 d-flex align-items-center">
                <input ref="input" type="file" class="d-none" accept="image/*" @change="handleFile($event)" required>
                <button type="button" @click="openFile()" class="btn w-50 btn-outline-secondary">
                  Upload file
                </button>
                <div v-if="form.file">
                  {{ form.file.name }}
                  <button type="button" @click="form.file = null" class="btn badge badge-light">
                    <i class="fa fa-trash text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div @click="submit()" v-if='sending' id="submit-button" type="button" class="btn btn-primary"><i class="fas fa-spinner fa-pulse fa-2x"></i></div>
          <button @click="submit()" v-if='!sending' id="submit-button" type="button" class="btn btn-primary"><i class="fas fa-plus-circle fa-2x"></i></button>
        </div>
      </div>
    </div>
    </form>
    <div
      class="modal-backdrop fade "
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none'}">
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      showModal: false,
      form: {
        file: '',
        value: '',
        description: ''
      },
      sending: false
    }
  },
  computed: {
    fileName () {
      const { file } = this.form

      if (file) {
        const split = file.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    modalVisibility () {
      this.showModal = !this.showModal
    },
    openFile () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    handleFile ({ target }) {
      this.form.file = target.files[0]
    },
    async submit () {
      let url = ''
      try {
        this.sending = true
        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key
        if (this.form.file) {
          const snapshot = await this.$firebase.storage()
            .ref(window.uid)
            .child(this.fileName)
            .put(this.form.file)
          url = await snapshot.ref.getDownloadURL()
        }
        const payload = {
          id: id,
          urlFile: url,
          ...this.form,
          createdAt: new Date().getTime()
        }
        ref.child(id).set(payload, err => {
          if (err) {
            console.log(err)
          } else {
            console.log(payload)
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        setTimeout(() => { this.sending = false }, 1500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../assets/scss/variables';

  #close-modal {
    color: #fff;
    opacity: 1;
    transition: 0.4s;
    &:hover{
      opacity: 0.5;
    }
  }

  .modal-header {
    background-color: $background;
    color: white;
  }
  .modal-body {
    background-color: $backgroundLoading;
    color: white;
  }

  #submit-button {
    padding: 1vh 0 1vh 0;
    background-color: $backgroundLoading !important;
    color: $iconLoading !important;
    margin: 0;
    padding: 2vh 0 2vh 0;
    &:hover {
      background-color: $iconLoading !important;
      color: $backgroundLoading !important;
    }
    &.active {
      background-color: $iconLoading !important;
      color: $backgroundLoading !important;
      border: 0 !important

    }
  }
</style>
