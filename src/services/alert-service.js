export default {
    install(Vue, options) {
        Vue.prototype.$alert = function (type, text, requestError) {
          let icon = null;

          switch (type) {
              case 'success':
                  icon = 'check_circle';
                  break;
              case 'warning':
                  icon = 'priority_high';
                  break;
              case 'error':
                  icon = 'warning';
                  break;
          }

          if (requestError && requestError.message)
            text += `: ${requestError.message}.`;

          Vue.prototype.$alerts.push({type, text, icon});
          setTimeout(() => this.$alerts.shift(), 3000)
        };

        Vue.prototype.$alerts = [];
    }
};
