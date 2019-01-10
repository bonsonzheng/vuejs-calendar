<template>
    <div id="event-form" :class="{active:active}" :style="{top:top, left: left}">
        <h4>add an event</h4>
        <p>{{ date }}</p>
        <div class="text">
            <input v-focus type="text" v-model="description" placeholder="What are you going to do" @keyup.enter="create">
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
                description: ''
            }
        },
        methods: {
            create() {
                if(this.description.length > 0){
                    this.$store.dispatch('addEvent', this.description).then(_=>{
                        this.description='';
                        this.$store.commit('eventFormActive',false);
                    });
                }
            },
            close() {
                this.$store.commit('eventFormActive', false);
            }
        },
        computed: {
            date(){
                let selectedDate = this.$store.state.eventFormDate;
                return selectedDate.format('dddd, MMM Do');
            },
            active() {
                return this.$store.state.eventFormActive;
            },
            top() {
                return `${this.$store.state.eventFormPosY}px`;
            },
            left() {
                return `${this.$store.state.eventFormPosX}px`;
            }
        },
        directives:{
            focus:{
                update(el){
                    el.focus();
                }
            }
        }

    }
</script>

<style scoped>

</style>