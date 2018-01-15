import store from './../store';

const MIN_ANIMATION_TIME = 1000;

class Progress {
  constructor() {
    this.time = 0;
    this._active = false;
    this.queue = store.state.activeRequests;
    this.queueData = store.state.requestsData;
  }

  endEvent() {
    if (this.queue.length === 0)
      this.active = false;
  }

  get active() {
    return this._active;
  }

  set active(val) {
    if (this._active === false && val === true) {
      this.time = new Date();
      this._active = val;
    }

    if (this._active === true && val === false) {
      if (this.queue.length !== 0)
        return;

      const time = new Date() - this.time;
      setTimeout(() => {
        this._active = val;
      }, (time < MIN_ANIMATION_TIME)? MIN_ANIMATION_TIME - time : 0)
    }
  }

  get status() {
    let status = '';

    for (let i = 0; i < this.queue.length; i++) {
      status += `${this.queueData[i].message}`;

      if (i !== this.queue.length - 1)
        status += '<br>';
    }

    return status;
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$progress = new Progress();
  }
};
