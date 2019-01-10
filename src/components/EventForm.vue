<template>
    <div id="event-form" :class="{active:active}" :style="{top:top, left: left}">
        <h4>add an event</h4>
        <p>{{ date }}</p>
        <div class="text">
            <input v-focus type="text" v-model="description" placeholder="What are you going to do"
                   @keyup.enter="create">
        </div>
        <div class="buttons">
            <button @click="create">Create</button>
        </div>
        <button id="close-button" @click="close">&#10005</button>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                description: '',
                top:0,
                left:0
            }
        },

        created() {
            console.log("created() is invoked")
            this.$bus.$on('create-event-request', this.openForm);
            this.$bus.$on('month-changed', this.monthChanged);
        },
        methods: {
            openForm(posX, posY, date) {
                this.left = posX + 'px';
                this.top = posY + 'px';
                this.$store.commit('eventFormDate',date);
                this.$store.commit('eventFormActive',true);
            },
            monthChanged(){
                this.$store.commit('eventFormActive',false);
            },

            create() {
                if (this.description.length > 0) {
                    this.$store.dispatch('addEvent', {description:this.description,date:this.$store.state.eventFormDate}).then(_ => {
                        this.description = '';
                        this.$store.commit('eventFormActive',false);
                    });
                }
            },
            close() {
                this.$store.commit('eventFormActive',false);
            }
        },
        computed:{
            active(){
                return this.$store.state.eventFormActive;
            },
            date(){
                let selectedDate = this.$store.state.eventFormDate;
                return selectedDate.format('dddd, MMM Do');
            }
        },
        directives: {
            focus: {
                update(el) {
                    el.focus();
                }
            }
        }

    }
</script>