import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Manager from '@/components/Manager'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager
    }
  ]
})
