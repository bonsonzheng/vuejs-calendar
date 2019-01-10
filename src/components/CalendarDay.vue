<template>
    <div :class="highLightToday" @click="captureClick">
        {{day.format('D')}}
        <ul class="event-list">
            <li v-for = "event in events" @click="onClickEvent(event)">{{event.description}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['day'],
        computed: {
            events(){
                return this.$store.state.events.filter(event=>event.date.isSame(this.day,'day'));
            },
            highLightToday() {
                let today = this.day.isSame(this.$moment(), 'day');
                let eventFormDate = this.$store.state.eventFormDate;
                let eventFormActive = this.$store.state.eventFormActive;
                return {
                    day: true,
                    today,
                    past:this.day.isSameOrBefore(this.$moment(),'day') && !today,
                    active:this.day.isSame(eventFormDate,'day') && eventFormActive
                }
            }
        },
        methods:{
            captureClick(mouseEvent){
                this.$bus.$emit('create-event-request', mouseEvent.clientX,mouseEvent.clientY,this.day)
            },
            onClickEvent(calendarEvent){
                console.log("an calendarEvent is chosen -- " + calendarEvent.description)
            }
        }
    }
</script>