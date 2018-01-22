//localStorage.getItem + localStorage.setItem + .removeItem
class User {
  constructor(cookie) {
    this.cookie = cookie;
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$user = new User(Vue.cookie);
  }
};
