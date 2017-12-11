const MIN_ANIMATION_TIME = 1000;

class Progress {
  constructor() {
    this._time = 0;
    this._active = false;
    this._queue = [];
  }

  add(path) {
    this._queue.push(path);

    if (this.active !== true)
      this.active = true;
  }

  remove(path) {
    const index = this._queue.indexOf(path);
    this._queue.splice(index, 1);

    if (this._queue.length === 0)
      this.active = false;
  }

  get active() {
    return this._active;
  }

  set active(val) {
    if (this._active === false && val === true) {
      this._time = new Date();
      this._active = val;
    }

    if (this._active === true && val === false) {
      const time = new Date() - this._time;
      setTimeout(() => {
        this._active = val;
      }, (time < MIN_ANIMATION_TIME)? MIN_ANIMATION_TIME - time : 0)
    }
  }

  get status() {
    let status = '';

    for (let i = 0; i < this._queue.length; i++) {
      status += `waiting for ${this._queue[i]}`;

      if (i !== this._queue.length - 1)
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
