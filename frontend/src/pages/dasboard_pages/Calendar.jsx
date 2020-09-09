import React from 'react'
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import events from '../../utils/events'
import * as dates from '../../utils/dates'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

let allViews = Object
    .keys(Views)
    .map(k => Views[k])

const ColoredDateCellWrapper = ({children}) => React.cloneElement(React.Children.only(children), {
    style: {
        backgroundColor: 'lightblue'
    }
})

const local = momentLocalizer(moment)

let Basic = () => (<Calendar
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    max={dates.add(dates.endOf(new Date(), 'day'), -1, 'hours')}
    defaultDate={new Date()}
    components={{
    timeSlotWrapper: ColoredDateCellWrapper
}}
    localizer={local}/>)

export default Basic