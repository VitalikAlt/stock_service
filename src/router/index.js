import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Booker from '@/components/Booker'
import Deputy from '@/components/Deputy'
import Manager from '@/components/Manager'
import Seamstress from '@/components/Seamstress'
import Storekeeper from '@/components/Storekeeper'

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
    },
    {
      path: '/seamstress',
      name: 'Seamstress',
      component: Seamstress
    },
    {
      path: '/booker',
      name: 'Booker',
      component: Booker
    },
    {
      path: '/deputy',
      name: 'Deputy',
      component: Deputy
    },
    {
      path: '/storekeeper',
      name: 'Storekeeper',
      component: Storekeeper
    }
  ]
})
