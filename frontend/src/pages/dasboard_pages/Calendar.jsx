import React from 'react'
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import events from '../../utils/events'
import * as dates from '../../utils/dates'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

const DragAndDropCalendar = withDragAndDrop(Calendar)

let allViews = Object
    .keys(Views)
    .map(k => Views[k])

const ColoredDateCellWrapper = ({children}) => React.cloneElement(React.Children.only(children), {
    style: {
        backgroundColor: 'lightblue'
    }
})

class BigCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            events: events,
            displayDragItemInCell: true
        }

        this.moveEvent = this
            .moveEvent
            .bind(this)
        this.newEvent = this
            .newEvent
            .bind(this)
    }
    handleDragStart = event => {
        this.setState({draggedEvent: event})
    }

    dragFromOutsideItem = () => {
        return this.state.draggedEvent
    }

    onDropFromOutside = ({start, end, allDay}) => {
        const {draggedEvent} = this.state

        const event = {
            id: draggedEvent.id,
            title: draggedEvent.title,
            start,
            end,
            allDay: allDay
        }

        this.setState({draggedEvent: null})
        this.moveEvent({event, start, end})
    }

    moveEvent = ({event, start, end, isAllDay: droppedOnAllDaySlot}) => {
        const {events} = this.state

        let allDay = event.allDay

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? {
                    ...existingEvent,
                    start,
                    end
                }
                : existingEvent
        })

        this.setState({events: nextEvents})

    }

    resizeEvent = ({event, start, end}) => {
        const {events} = this.state

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? {
                    ...existingEvent,
                    start,
                    end
                }
                : existingEvent
        })

        this.setState({events: nextEvents})

    }

    newEvent(event) {}

    render() {
        const local = momentLocalizer(moment)
        return (
            <div>
                <DragAndDropCalendar
                    localizer={local}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                    height: 500
                }}/>
            </div>
        )
    }
}

export default BigCalendar
