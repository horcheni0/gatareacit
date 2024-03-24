import { React, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const ContactUS = () => {
  const position = [36.8144, 10.1014];
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/msg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, message, number }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFullname('');
        setEmail('');
        setMessage('');
        setNumber('');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
    setLoading(false);
  };
  return (
    <div className="relative rounded-2xl flex flex-col md:flex-row shadow-[0px_6px_16px_rgba(98,100,108,0.5)] mt-9 mb-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 130 1440 160" className="absolute top-0 right-0 z-10">
        <path fill="#422afb" fillOpacity="1" d="M0,64L60,85.3C120,107,240,149,360,186.7C480,224,600,256,720,272C840,288,960,288,1080,293.3C1200,299,1320,309,1380,314.7L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
      </svg>
      <div className="flex-1 md:max-w-[50%] xl:max-w-[420px]">
        <form className="login p-6" onSubmit={handleSubmit} >
          <h3 className=" text-4xl mb-9 mt-6 font-bold text-navy-700 dark:text-white">You can send us <span className='text-indigo-600'>Message</span></h3>
          <label className='dark:text-gray-600'>Full name:</label>
          <input value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]' type="text" />
          <label className='dark:text-gray-600'>Email address:</label>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
            type="email" />
          <label className='dark:text-gray-600'>Number:</label>
          <input value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
            type="number" />
          <label className='dark:text-gray-600'>Message:</label>
          <input type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className='w-full border h-[150px] rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
          />
          <button type="submit" disabled={loading} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            {loading ? 'Sending...' : 'Send'}
          </button>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">Message sent successfully!</div>}
        </form>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mt-[25vh] mx-auto md:ml-28 md:h-[300px] md:w-[900px] lg:w-[800px] rounded border-[#622aff] flex-col items-center md:pl-4 lg:pl-0">
          <div className="px-4 md:px-0">
            <h3 className="mb-9 text-4xl font-bold text-navy-700 dark:text-white">
              Our <span className="text-indigo-600">Contacts</span>
            </h3>
            <div className='flex space-x-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-8 text-[#757575]">
                <path strokeLinecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <h1 className="text-xl dark:text-gray-600 mb-5">
                Website: www.data-doit.com
              </h1>
            </div>
            <div className='flex space-x-4'>
              <box-icon name='linkedin' type='logo' color='#757575' style={{ width: '40px', height: '40px' }}></box-icon>
              <h1 className="text-xl dark:text-gray-600 mb-5">
                LinkedIn: www.linkedin.com/company/datadoit
              </h1>
            </div>
            <div className='flex space-x-4'>
              <box-icon name='envelope' color='#757575' ></box-icon>
              <h1 className="text-xl dark:text-gray-600 mb-5">
                Email: hello@data-doit.com
              </h1>
            </div>
            <div className='flex space-x-4'>
              <box-icon name='phone' color='#757575' ></box-icon>
              <h1 className="text-xl dark:text-gray-600 mb-5">
                Phone Number: + (216) 54 027 941
              </h1>
            </div>
            <div className='flex space-x-4'><box-icon name='map' color='#757575' ></box-icon>
              <h1 className="text-xl dark:text-gray-600 mb-5">
                Map: Technopole Mannouba , tunisie
              </h1></div>
            </div>
        </div>
        <div className="w-full mt-8 md:mt-48 ml-0 md:ml-11">
          <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>Tunisia Technopole, Mannouba</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;
