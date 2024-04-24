import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from 'axios';
const socket = io("http://localhost:3000"); 

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("join", room);
    });
  
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });
  
    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, [room]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`/api/user?firstname=${searchInput}`)
      .then((response) => {
        const responseData = response.data;
        let searchedUser = null;
        if (Array.isArray(responseData)) {
          searchedUser = responseData.find(user => user.firstname === searchInput);
        } else {
          searchedUser = responseData;
        }
        if (searchedUser) {
          setSelectedUserId(searchedUser._id);
          console.log(searchedUser._id);
        } else {
          console.log('User not found');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "" && selectedUserId !== "") {
      const data = {
        message: message,
        from: id, 
        to: selectedUserId,
        room: room,
      };
      socket.emit("message", data);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='flex h-[45rem] mt-6 '>
      <div className='bg-white w-1/3 rounded '>
        <div>
          <p className="text-center text-2xl mt-6 font-extrabold">Contacts</p>
          <form onSubmit={handleSearchSubmit}>
            <input className="mt-6 ml-9 border border-indigo-700 w-96 h-9 rounded-lg" type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            <button className="bg-purple-300 w-13 h-9 rounded-lg" type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className="bg-purple-100 rounded w-2/3 p-2 flex flex-col">
        <div className='flex-grow'>
          messages with selected person
        </div>
        <div className='flex gap-2 '>
          <form onSubmit={handleSubmit}>
            <input type="text" className='bg-white border flex-grow  rounded-sm p-2' placeholder='type your message here' value={message} onChange={handleChange} />
            <button type="submit" className='bg-purple-500 p-2 text-white rounded-sm'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
