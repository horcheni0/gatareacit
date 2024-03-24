import { useEffect } from "react"
import { useEventsContext } from "../events-manage/hooks/useEventsContext"
import {useAuthContext } from 'views/auth/hooks/useAuthContext'
// components
import EventDetails from "../events-manage/components/eventsDetails"
import EventForm from "../events-manage/components/eventForm"

const ManagaEvent = () => {
  const { events, dispatch } = useEventsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events',{
        headers : {
          'Authorization' :`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_EVENTS', payload: json})
      }
    }
    if(user){

    fetchEvents()
  }
  }, [dispatch,user])
  return (
    <div className=' grid grid-cols-[3fr_1fr] gap-[100px]'>
      <div className='events mt-2.5 grid-cols-[3fr_1fr] gap-[100px] '>
        {events && events.map((event) => (
          <EventDetails key={event._id} event={event} />

        ))}
      </div>
      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <EventForm />
      </div>
    </div>
  );
};

export default ManagaEvent;
