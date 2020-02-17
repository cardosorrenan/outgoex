<template>
  <div class="w-100 d-flex justify-content-center">
    <button @click="modalVisibility()" class="btn add-btn w-75">
      New Expense
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
                <input required v-model="form.description" type="text" class="form-control">
              </div>
               <div class="form-group col-4">
                <label for="">Value: </label>
                <input required v-model="form.value" type="text" class="form-control" @keypress="onlyNumber">
              </div>
              <div class="form-group flex-column col-12 d-flex align-items-center">
                <input ref="input" type="file" class="d-none" accept="image/*" @change="handleFile($event)">
                <button type="button" @click="openFile()" class="upload-btn btn w-50 btn-outline-secondary">
                  Upload file
                </button>
                <div class='file-name' v-if="form.file">
                  <div>{{ form.file.name }}</div>
                  <button type="button" @click="form.file = null" class="trash-btn btn badge badge-light">
                    <i class="fa fa-trash text-danger fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if='sending' id="submit-button" class="spinner" ><i class="fas fa-spinner fa-pulse fa-2x"></i></div>
          <button v-else id="submit-button" type="submit"><i class="fas fa-plus-circle fa-2x"></i></button>
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
    onlyNumber ($event) {
      // console.log($event.keyCode); //keyCodes value
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which)
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault()
      }
    },
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
      if (+this.form.value === 0) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Not possible to insert expense'
        })
      } else {
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
              this.$root.$emit('Notification::show', {
                type: 'danger',
                message: 'Not possible to insert expense'
              })
            } else {
              this.$root.$emit('Notification::show', {
                type: 'success',
                message: 'Expense storaged!'
              })
            }
          })
        } catch (err) {
          this.$root.$emit('Notification::show', {
            type: 'danger',
            message: 'Not possible to insert expense'
          })
        } finally {
          setTimeout(() => { this.sending = false }, 1000)
          this.form.value = ''
          this.form.description = ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../assets/scss/variables';

  .add-btn {
    background-color: $iconLoading;
    color: $backgroundLoading;
    &:hover {
      background-color: $iconLoading;
      box-shadow: 0px 0px 10px $iconLoading;
    }
  }
  .modal {
    top: 10vh;
    left: 10vh;
  }

  #close-modal {
    color: #fff;
    opacity: 1;
    transition: 0.4s;
    &:hover {
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
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  .upload-btn {
    margin-bottom: 0px;
  }

  #submit-button {
    display: flex;
    justify-content: center;
    border: 0;
    padding: 10px;
    transition: 0.8s;
    background-color: $iconLoading;
    &:hover {
      background-color: $iconLoading2;
    }
  }

  .spinner {
    cursor: none;
  }

  .trash-btn {
    background-color: $backgroundLoading;
    padding: 0;
    margin: 0 0 0 20px;
  }

  .file-name {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0 10px 0;
  }

</style>
