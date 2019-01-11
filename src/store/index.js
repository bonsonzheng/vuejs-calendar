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

        deleteEvent(state, eventId) {
            let index = state.events.findIndex((obj => obj.eventId == eventId));
            state.events.splice(index,1);
        },

        updateEvent(state, payload) {
            let index = state.events.findIndex((obj => obj.eventId == payload.eventId));
            state.events[index].description = payload.description;
        },
        eventFormDate(state, payload) {
            state.eventFormDate = payload;
        }
    },

    actions: {
        addEvent(context, payload) {
            return new Promise((resolve, reject) => {
                let object = {
                    eventId: payload.eventId,
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

        },
        updateEvent(context, payload) {
            return new Promise((resolve, reject) => {
                let object = {
                    eventId: payload.eventId,
                    description: payload.description,
                    date: payload.date
                };

                Axios.put('/event', object).then(response => {
                    if (response.status === 200) {
                        context.commit('updateEvent', object);
                        resolve();
                    }else{
                        reject();
                    }
                });
            });

        },
        deleteEvent(context, payload) {
            return new Promise((resolve, reject) => {
                Axios.delete('/event/' + payload).then(response => {
                    if (response.status === 200) {
                        context.commit('deleteEvent',payload);
                        resolve();
                    }else{
                        reject();
                    }
                });
            });

        }
    },

});