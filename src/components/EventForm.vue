<template>
    <div id="event-form" :class="{active:active}" :style="{top:top, left: left}">
        <h4>{{action | actionInTitle}}</h4>
        <p>{{ date }}</p>
        <div class="text">
            <input v-focus type="text" v-model="description" placeholder="What are you going to do"
                   @keyup.enter="pressEnter">
        </div>
        <div class="buttons" v-if="action==='createEvent'">
            <button @click="create">Create</button>
        </div>
        <div v-else class="buttons">
            <button @click="update">update</button>
            <button @click="remove">remove</button>
        </div>

        <button id="close-button" @click="close">&#10005</button>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                eventId: '',
                action: '',
                description: '',
                top: 0,
                left: 0
            }
        },

        methods: {
            newEvent(posX, posY, date) {
                console.log("Is this called?????")
                this.description = '';
                this.left = posX + 'px';
                this.top = posY + 'px';
                this.action = 'createEvent';
                this.$store.commit('eventFormDate', date);
                this.$store.commit('eventFormActive', true);
            },

            modifyEvent(posX, posY, event,date) {
                this.left = posX + 'px';
                this.top = posY + 'px';
                this.action = 'modifyEvent';
                this.eventId = event.eventId;
                this.description = event.description;
                this.$store.commit('eventFormDate', date);
                this.$store.commit('eventFormActive', true);
            },

            monthChanged() {
                this.$store.commit('eventFormActive', false);
            },

            pressEnter() {
                if (this.action === 'createEvent') {
                    this.create();
                } else {
                    this.update();
                }
            },

            create() {
                if (this.description.length > 0) {
                    let eventId = Date.now();
                    this.$store.dispatch('addEvent', {
                        eventId: eventId,
                        description: this.description,
                        date: this.$store.state.eventFormDate
                    }).then(_ => {
                        this.description = '';
                        this.$store.commit('eventFormActive', false);
                    });
                }
            },
            update() {
                this.$store.dispatch('updateEvent', {
                    eventId: this.eventId,
                    description: this.description,
                    date: this.$store.state.eventFormDate
                })
                    .then(_ => this.$store.commit('eventFormActive', false));
            },
            remove() {
                this.$store.dispatch('deleteEvent', this.eventId).then(_ => this.$store.commit('eventFormActive', false));
            },

            close() {
                this.$store.commit('eventFormActive', false);
            }
        },

        computed: {
            active() {
                return this.$store.state.eventFormActive;
            },
            date() {
                let selectedDate = this.$store.state.eventFormDate;
                return selectedDate.format('dddd, MMM Do');
            }
        },

        created() {
            console.log("created() is invoked")
            this.$bus.$on('create-event-request', this.newEvent);
            this.$bus.$on('modify-event-request', this.modifyEvent);
            this.$bus.$on('month-changed', this.monthChanged);
        },

        directives: {
            focus: {
                update(el) {
                    el.focus();
                }
            }
        },
        filters: {
            actionInTitle(action) {
                let result = action.replace(/([A-Z])/g, " $1");
                return result.charAt(0).toUpperCase() + result.slice(1);
            }
        }

    }
</script>