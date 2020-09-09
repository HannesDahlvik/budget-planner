import React from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import events from '../../utils/events'
import * as dates from '../../utils/dates'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

class BigCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        
    }

    render() {
        const local = momentLocalizer(moment)
        return (
            <div>
                <Calendar
                    localizer={local}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        height: 750
                    }} />
            </div>
        )
    }
}

export default BigCalendar
