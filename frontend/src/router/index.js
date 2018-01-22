import Vue from 'vue'
import Router from 'vue-router'
import triggers from './triggers'
import Auth from '@/components/Auth'
import Booker from '@/components/booker/BookerMain'
import Deputy from '@/components/Deputy'
import Manager from '@/components/Manager'
import Seamstress from '@/components/Seamstress'
import Storekeeper from '@/components/Storekeeper'
import ResetAdmin from '@/components/ResetAdmin'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager,
      meta: { requireAuth: true, allowedRoles: ['manager']}
    },
    {
      path: '/seamstress',
      name: 'Seamstress',
      component: Seamstress,
      meta: { requireAuth: true, allowedRoles: ['seamstress']}
    },
    {
      path: '/booker',
      name: 'Booker',
      component: Booker,
      meta: { requireAuth: true, allowedRoles: ['booker']}
    },
    {
      path: '/deputy',
      name: 'Deputy',
      component: Deputy,
      meta: { requireAuth: true, allowedRoles: ['deputy']}
    },
    {
      path: '/storekeeper',
      name: 'Storekeeper',
      component: Storekeeper,
      meta: { requireAuth: true, allowedRoles: ['storekeeper']}
    },
    {
      path: '/reset_admin',
      name: 'ResetAdmin',
      component: ResetAdmin
    }
  ]
});

triggers(router);

export default router;
