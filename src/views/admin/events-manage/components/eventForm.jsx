import { useState } from "react"
import { useEventsContext } from '../hooks/useEventsContext';
import {useAuthContext } from 'views/auth/hooks/useAuthContext'

const EventForm = () => {
    const { dispatch } = useEventsContext()
    const {user} = useAuthContext()
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [logo, setLogo] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setLogo(reader.result);
        };
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return
        }
        const event = { name, location,start,end, logo }
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-type': 'application/json',
                'Authorization' :`Bearer ${user.token}`

            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setName('')
            setLocation('')
            setStart('')
            setEnd('')
            setLogo('')
            setError(null)
            dispatch({ type: 'CREATE_EVENT', payload: json })
            console.log('new event added', json)
        }
    }
    return (
        <form className="create block mt-6" onSubmit={handleSubmit}>
            <h1 className="text-[1.7em]  mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Add a new event :</h1>
            <label className="block dark:text-gray-600">Exersize Title :</label>
            <input className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes('name') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label className="block dark:text-gray-600 ">Location :</label>
            <input className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes('location') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
            />
            <label className="block dark:text-gray-600">Date and time of start:</label>
            <input className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes('date') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="datetime-local"
                onChange={(e) => setStart(e.target.value)}
                value={start}
            />
            <label className="block dark:text-gray-600">Date and time of end :</label>
            <input className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes('date') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="datetime-local"
                onChange={(e) => setEnd(e.target.value)}
                value={end}
            />
            <label className="block dark:text-gray-600">Logo :</label>
            <input
            className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${
                emptyFields.includes("logo") ? "border-red-500" : "border-[#ddd]"
            }`}
            type="file"
            onChange={handleLogoChange}
            />
            <button className="text-white rounded cursor-pointer p-2.5 border-0 bg-purple-700 ">Add Event</button>
            {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}

        </form>

    )
}
export default EventForm;
