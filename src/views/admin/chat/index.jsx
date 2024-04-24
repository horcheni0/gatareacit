import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const id = JSON.parse(localStorage.getItem("user"))?.id || "";
  const [fromUserId, setFromUserId] = useState(id);
  const [searchInput, setSearchInput] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [toUserId, setToUserId] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/user?firstname=${searchInput}`);
      const responseData = response.data;
      const searchedUser = Array.isArray(responseData)
        ? responseData.find((user) => user.firstname === searchInput)
        : responseData;

      if (searchedUser) {
        setSearchedUser(searchedUser);
        console.log(searchedUser);
      } else {
        setSearchedUser(null);
        console.log("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserClick = (id) => {
    setToUserId(id);
    console.log(id);
  };

  const fetchMessages = async () => {
    if (fromUserId && toUserId) {
      try {
        const fetchSentMessages = axios.post("/api/chatify/getmsg", {
          from: fromUserId,
          to: toUserId,
        });
        const fetchReceivedMessages = axios.post("/api/chatify/getmsg", {
          from: toUserId,
          to: fromUserId,
        });

        const [sentResponse, receivedResponse] = await axios.all([
          fetchSentMessages,
          fetchReceivedMessages,
        ]);

        const sentMessages = sentResponse.data.map((msg) => ({
          ...msg,
          fromSelf: true,
        }));
        const allMessages = [...sentMessages];
        setMessages(allMessages);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sendMessage = async () => {
    if (fromUserId && toUserId && messageInput.trim() !== "") {
      try {
        await axios.post("/api/chatify/addmsg", {
          from: fromUserId,
          to: toUserId,
          message: messageInput,
        });
        console.log("Message sent successfully");
        setMessageInput("");
        fetchMessages();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [toUserId]);

  return (
    <div className="flex h-[45rem] mt-6 ">
      <div className="bg-[#d5adfc64] w-1/3 rounded ">
        <p className="text-center text-2xl mt-6 font-extrabold">Contacts</p>
        <div className="flex">
          <input
            className="mt-6 ml-9 border border-indigo-900 w-96 h-9 rounded-lg"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="bg-purple-700 text-white mt-6 w-13 h-9 rounded-lg"
            type="submit"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </div>
        <div className="mt-6 ml-9">
          {searchedUser ? (
            <div
              className="bg-purple-100 border rounded-lg w-[385px] "
              onClick={() => handleUserClick(searchedUser._id)}
            >
              <p>First Name: {searchedUser.firstname}</p>
              <p>Last Name: {searchedUser.lastname}</p>
              <p>Email: {searchedUser.email}</p>
            </div>
          ) : (
            <p>User not found</p>
          )}
        </div>
      </div>
      <div className="bg-[#070c39] rounded w-2/3 p-2 flex flex-col">
        <div className="flex-grow">
          <h2 className="text-center text-white dark:text-gray-600 text-2xl mt-6 font-extrabold">
            Messages with selected User:
          </h2>
          <ul>
            {messages.map((message, index) => (
              <li
                key={index}
                className={`text-xl text-${
                  message.sender === "You" ? "white" : "white"
                } ${message.sender === "You" ? "text-right" : ""} rounded-2xl w-66`}
              >
                {message.sender}: {message.message}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 ">
          <input
            type="text"
            className="bg-white border flex-grow  rounded-sm p-2"
            placeholder="type your message here"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button className="bg-purple-700 p-2 text-white rounded-sm" onClick={sendMessage}>
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
