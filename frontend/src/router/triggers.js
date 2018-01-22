import Vue from 'vue'
import store from './../store'

export default function(router) {
  router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      const isRemembered = (!store.state.account.role && Vue.prototype.$cookie.get('auth_token'));
      if (to.meta.allowedRoles.indexOf(store.state.account.role) !== -1 || isRemembered)
        return next();

      return next({path: '/', query: {redirect: to.fullPath}})
    }

    next()
  });
}
