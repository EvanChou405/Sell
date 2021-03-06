// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import App from './App'
import router from './router'
import '../static/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/* ここから */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)
/* ここまで */

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.use(ElementUI)// 全局使用ElementUI

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/* Firebase */
const config = {
  apiKey: 'AIzaSyBQNBdBl846-UH17Z8sVAOVlAjufvHfZ0A',
  authDomain: 'vue-sample-72ee5.firebaseapp.com'
}

firebase.initializeApp(config)
