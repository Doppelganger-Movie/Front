import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import vuetify from './plugins/vuetify'
import vueMoment from 'vue-moment' 
import Paginate from 'vuejs-paginate' 
  

Vue.component('paginate', Paginate)
Vue.use(Paginate)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(vueMoment)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
