// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import style from "./assets/style.css"
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueMaterial)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
