import React from 'react'
import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useAuthContext } from 'views/auth/hooks/useAuthContext'
import { useEventsContext } from "../events-manage/hooks/useEventsContext"

const CalendarComponent = () => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: event.color,
      borderRadius: '10px',
      opacity: 0.8,
      border: 'none',
      display: 'block',
      height:'50px',
      fontSize:'22px',
    };
    return {
      style: style
    };
  };
  const { events, dispatch } = useEventsContext()
  const localizer = momentLocalizer(moment)
  const { user } = useAuthContext()

  useEffect(() => {
    let isMounted = true

    const fetchEvents = async () => {
      const response = await fetch('/api/events',{
        headers : {
          'Authorization' :`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok && isMounted) {
        dispatch({ type: 'SET_EVENTS', payload: json.map(event => ({...event, title: event.name, start: new Date(event.start), end : new Date(event.end)})) })
      }
    }

    if (user) {
      fetchEvents()
    }

    return () => {
      isMounted = false
    }
  }, [dispatch, user])

  return (
    <div className='mt-6'>
      <Calendar
        localizer={localizer}
        events={events || []}
        startAccessor={event => new Date(event.start)}
        endAccessor={event => new Date(event.end)}
        eventPropGetter={eventStyleGetter}
        style={{ 
          height: 700, 
        }}
        
      />
    </div>
  )
}

export default CalendarComponent
