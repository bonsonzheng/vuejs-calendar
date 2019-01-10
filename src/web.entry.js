import Vue from 'vue';
import './style.scss';
import store from './store';

import App from './components/App.vue';
import moment from 'moment-timezone';

moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', {
  get() {
    return this.$root.moment
  }
});

let events = window.__INITIAL_STATE__.map(state => {
      return {
        description: state.description,
        date: moment(state.date)
      };
    }
);

let initialState = Object.assign({}, store.state, {events});
store.replaceState(initialState);

new Vue({
  el: '#app',
  data: {
    moment
  },

  components: {
    App
  },

  store

});
