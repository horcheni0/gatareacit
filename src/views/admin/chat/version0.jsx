import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Chat(props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const id = JSON.parse(localStorage.getItem("user"))?.id || "";

  useEffect(() => {
    if (selectedUserId) {
      axios
        .post("/api/chatify/getmsg", {
          from: id,
          to: selectedUserId,
        })
        .then((response) => {
          const messages = response.data;
          console.log(messages);
          setMessages(messages);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedUserId, id]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`/api/user?firstname=${searchInput}`)
      .then((response) => {
        const responseData = response.data;
        let searchedUser = null;
        if (Array.isArray(responseData)) {
          searchedUser = responseData.find(
            (user) => user.firstname === searchInput
          );
        } else {
          searchedUser = responseData;
        }
        if (searchedUser) {
          setSearchedUser(searchedUser);
          console.log(searchedUser);
        } else {
          setSearchedUser(null);
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserClick = (id) => {
    setSelectedUserId(id);
    console.log(id);

    // Send message to the selected user
    axios
      .post(`/api/chatify/addmsg`, {
        from: id,
        to: selectedUserId,
        message: messageInput, // Use the message input captured from the user
      })
      .then((response) => {
        console.log(response.data.msg); 
axios
.post("/api/chatify/getmsg", {
  from: id,
  to: selectedUserId,
})
.then((response) => {
  const updatedMessages = response.data;
  setMessages(updatedMessages);
})
.catch((error) => {
  console.log(error);
});
    }) }
  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
  };

  return (
    <div className="flex h-[45rem] mt-6 ">
      <div className="bg-[#d5adfc64] w-1/3 rounded ">
      <div>
        <p className="text-center	text-2xl mt-6 font-extrabold">Contacts</p>
        <div className="flex">
        <input className="mt-6 ml-9 border border-indigo-900 w-96 h-9 rounded-lg" type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <button className="bg-purple-700 text-white mt-6 w-13 h-9 rounded-lg" type="submit" onClick={handleSearchSubmit}>Search</button>
        </div>
        <div className="mt-6 ml-9">
        {searchedUser ? (
          <div className="bg-purple-100 border rounded-lg w-[385px] "onClick={() => handleUserClick(searchedUser._id)}>
            <p>First Name: {searchedUser.firstname}</p>
            <p>Last Name: {searchedUser.lastname}</p>
            <p>Email: {searchedUser.email}</p>
          </div>
        ) : (
          <p>User not found</p>
        )}
        </div>
        </div>    
          </div>
      <div className="bg-[#070c39] rounded w-2/3 p-2 flex flex-col">
      <div className="flex-grow" ref={messagesContainerRef}>
  <p className="text-center text-white dark:text-gray-600 text-2xl mt-6 font-extrabold">
    Messages with selected person
  </p>
  {/* Render the messages */}
  {messages.map((message, index) => (
    <div key={index} className="text-white">
      {message.fromSelf ? "You: " : "Other User: "}
      {message.message}
    </div>
  ))}
</div>
        <div className="flex gap-2 ">
          <input
            type="text"
            className="bg-white border flex-grow  rounded-sm p-2"
            placeholder="type your message here"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
  className="bg-purple-700 p-2 text-white rounded-sm"
  onClick={() => handleUserClick(searchedUser._id)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
    />
  </svg>
</button>
  
        </div>
      </div>
    </div>
  );
}

export default Chat;