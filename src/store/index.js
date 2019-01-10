import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import moment from 'moment-timezone';

moment.tz.setDefault('UTC');

import Axios from "axios"

export default new Vuex.Store({
    state: {
        currentYear: moment().year(),
        currentMonth: moment().month()+1,
        eventFormActive: false,
        events: [],
        eventFormDate: moment()
    },

    mutations: {
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },

        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },

        eventFormActive(state, payload) {
            state.eventFormActive = payload;
        },

        addEvent(state, payload) {
            state.events.push(payload);
        },

        eventFormDate(state, payload) {
            state.eventFormDate = payload;
        }
    },

    actions: {
        addEvent(context, payload) {
            return new Promise((resolve, reject) => {
                let object = {
                    description: payload.description,
                    date: payload.date
                };

                Axios.post('/event', object).then(response => {
                    if (response.status === 200) {
                        context.commit('addEvent', object);
                            resolve();
                    }else{
                        reject();
                    }
                });
            });

        }
    },

});