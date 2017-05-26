import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import WebChat from '@/components/WebChat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Login
    },
    {
      path: '/web-chat/:user',
      name: 'WebChat',
      component: WebChat
    }
  ]
})
