import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [fromUserId, setFromUserId] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [toUserId]);
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
    <div>
      <div>
        <label>From User ID:</label>
        <input
          type="text"
          value={fromUserId}
          onChange={(e) => setFromUserId(e.target.value)}
        />
      </div>
      <div>
        <label>To User ID:</label>
        <input
          type="text"
          value={toUserId}
          onChange={(e) => setToUserId(e.target.value)}
        />
      </div>
      <div>
        <label>Message:</label>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
      </div>
      <button onClick={sendMessage}>Send Message</button>

     <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {message.sender} {message.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Chat;

