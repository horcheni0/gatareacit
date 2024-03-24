import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [fromUserId, setFromUserId] = useState(JSON.parse(localStorage.getItem("user"))?.id || "");
  const [toUserId, setToUserId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  //const id = JSON.parse(localStorage.getItem("user"))?.id || "";
  //console.log(fromUserId);
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
  setToUserId(id);
  console.log(id);
}

useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [setToUserId]);
const fetchMessages = () => {
  if (fromUserId && toUserId) {
    const fetchSentMessages = axios.post("/api/chatify/getmsg", {
      from: fromUserId,
      to: toUserId,
    });
    const fetchReceivedMessages = axios.post("/api/chatify/getmsg", {
      from: toUserId,
      to: fromUserId,
    });

    axios
      .all([fetchSentMessages, fetchReceivedMessages])
      .then(
        axios.spread((sentResponse, receivedResponse) => {
          const sentMessages = sentResponse.data.map((msg) => ({
            ...msg,
            //sender: "",
            fromSelf: true,
          }));
          
          const allMessages = [...sentMessages];
          setMessages(allMessages);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }
};

  const sendMessage = () => {
    if (fromUserId && toUserId && messageInput.trim() !== "") {
      axios
        .post("/api/chatify/addmsg", {
          from: fromUserId,
          to: toUserId,
          message: messageInput,
        })
        .then((response) => {
          console.log(response.data.msg);
          setMessageInput(""); // Clear the message input field
          fetchMessages(); // Fetch updated messages after sending
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
          <div className="bg-purple-100 border rounded-lg w-[385px] " onClick={() => handleUserClick(searchedUser._id)}>
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
     <div className="flex-grow" >
        <h2 className="text-center text-white dark:text-gray-600 text-2xl mt-6 font-extrabold">Messages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {message.sender} {message.message}
            </li>
          ))}
           </ul>
        </div>
        <div className="flex gap-2 ">
          <input
            type="text"
            className="bg-white border flex-grow  rounded-sm p-2"
            placeholder="type your message here"
            onClick={sendMessage}
          />
          <button
  className="bg-purple-700 p-2 text-white rounded-sm">
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
