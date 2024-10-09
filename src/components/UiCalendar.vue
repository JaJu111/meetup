<template>
    <div>
        <v-row class="fill-height">
            <v-col>
                <v-sheet height="64">
                    <v-toolbar flat>
                        <v-btn fab text small color="grey darken-2" @click="prev">
                            <v-icon small>
                                mdi-chevron-left
                            </v-icon>
                        </v-btn>
                        <v-toolbar-title v-if="$refs.calendar">
                            {{ $refs.calendar.title }}
                        </v-toolbar-title>
                        <v-btn fab text small color="grey darken-2" @click="next">
                            <v-icon small>
                                mdi-chevron-right
                            </v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-sheet>
                <v-sheet height="600">
                    <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
                        :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
                        @change="updateRange"></v-calendar>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
    data() {
        return {
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days',
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        }
    },
    methods: {
        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor(event) {
            return event.color
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        updateRange({ start, end }) {
            const events = []

            const min = new Date(`${start.date}T00:00:00`)
            const max = new Date(`${end.date}T23:59:59`)
            const days = (max.getTime() - min.getTime()) / 86400000
            const eventCount = this.rnd(days, days + 20)

            for (let i = 0; i < eventCount; i++) {
                const allDay = this.rnd(0, 3) === 0
                const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
                const second = new Date(first.getTime() + secondTimestamp)

                events.push({
                    name: this.names[this.rnd(0, this.names.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                })
            }

            this.events = events
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
    }
}

</script>

<style lang="sass">
  
.v-toolbar__content
    justify-content: center
    background-color: #eaedf7

.v-toolbar__title
    color: #4c6bb6

.v-event.v-event-start.v-event-end span,
.v-event-more
    background-color: #4c6bb6
    color: white
    padding: 3px 30px
    border-radius: 4px


.v-calendar-weekly__day.v-past
    overflow: hidden

.v-calendar .v-event-summary
    display: ruby

.v-btn:not(.v-btn--round).v-size--default
    border: 2px solid #4c6bb6
    color: #4c6bb6

.v-toolbar__content .v-btn--fab.v-size--small
    border: 2px solid #4c6bb6
    color: #4c6bb6
    margin: 12px

.theme--light.v-btn.v-btn--has-bg
    background-color: #fff

.theme--light.v-calendar-weekly .v-calendar-weekly__day
    border-right: #eaedf7 1px solid
    border-bottom: #eaedf7 1px solid

.theme--light.v-calendar-weekly .v-calendar-weekly__head-weekday
    border-right: #eaedf7 1px solid

.theme--light.v-calendar-events .v-event-more,
.v-event.v-event-start.indigo.white--text,
.v-event.v-event-start.deep-purple.white--text,
.v-event.v-event-start.cyan.white--text,
.v-event.v-event-end.green.white--text,
.v-event.v-event-start.blue.white--text
    display: none

</style>