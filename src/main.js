import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/app.scss'
import animate from 'animate.css'

Vue.config.productionTip = false
Vue.use(animate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
