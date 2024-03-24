import React, { useState } from "react";
import { useEventsContext } from "../hooks/useEventsContext";
import {useAuthContext } from 'views/auth/hooks/useAuthContext'

const EventModal = ({ handleClose, event }) => {
  const {user} = useAuthContext()
  const { dispatch } = useEventsContext();
  const [name, setName] = useState(event?.name || "");
  const [location, setLocation] = useState(event?.location || "");
  const [start, setStart] = useState(event?.start ? new Date(event.start).toISOString().substr(0, 16) : "");
  const [end, setEnd] = useState(event?.end ? new Date(event.end).toISOString().substr(0, 16) : "");
  const handleSubmit = async (e) => {
    e.preventDefault();
      const eventData = {
      name: name,
      location: location,
      start: start,
      end: end,
    };
    if (event && event._id) {
      try {
        const response = await fetch(`/api/events/${event._id}`, {
          method: "PATCH",
          body: JSON.stringify(eventData),
          headers: {
            "Content-type": "application/json",
            'Authorization' :`Bearer ${user.token}`
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update event");
        }
  
        const updatedEventData = await response.json();
        dispatch({
          type: "UPDATE_EVENT",
          payload: { _id: event._id, ...updatedEventData },
        });
  
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  }; 
  return (
    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
      <div className="rounded-md bg-white p-8 border-2 shadow-lg border-purple-700">
        <h2 className="mb-4 text-xl font-semibold text-center text-purple-700">Modify Event</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>
            Start:
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label>
            End:
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </label>
          <button
            className="text-indigo-00 text-purple-700 text- mt-4 rounded py-2 px-4 font-bold hover:text-indigo-600"
            type="submit"
          >
            Save Changes
          </button>
          <button
            className="mt-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default EventModal;
