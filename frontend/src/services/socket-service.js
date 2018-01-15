import axios from 'axios'
const API_URL = 'http://localhost:8040';

const socket = {
    install(Vue, options) {
      const dev = process.env.NODE_ENV === 'development';
      Vue.prototype.$http = {
          get: function (path) {
            Vue.prototype.$progress.add(path.slice(0, path.indexOf('?')));
            return axios.get(dev? API_URL + path : path).then(...onResult(path.slice(0, path.indexOf('?'))))
          },
          post: function (path, body) {
            Vue.prototype.$progress.add(path);

            return axios.post(dev? API_URL + path : path, body, {
              headers: { 'Content-Type': 'application/json' }
            }).then(...onResult(path))
          },
          req: function (method, url, body = {}) {
            Vue.prototype.$progress.add();

            if (method === 'GET')
                return axios.get(url).then(...onResult);

            if (method === 'POST')
                return axios.post(url, body).then(...onResult)
          }
      };

      const onResult = function(path) {
        return [(res) => {
          Vue.prototype.$progress.remove(path);
          return Promise.resolve(res);
        }, (rej) => {
          Vue.prototype.$progress.remove(path);
          return Promise.reject(rej);
        }];
      }
    }
};

export default socket;
