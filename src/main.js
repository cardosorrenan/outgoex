import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/app.scss'
import Animate from 'animate.css'
import Firebase from './firebase'
import './utils/directives'

Vue.use(Firebase)
Vue.config.productionTip = false
Vue.use(Animate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
