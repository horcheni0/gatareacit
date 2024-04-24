import React, { useState, useEffect } from 'react';
import './MessageAdmin.css'; // Importing CSS file for styling

const MessageAdmin = () => {
  // State variable to store messages
  const [messages, setMessages] = useState([]);

  // Function to fetch messages from backend
  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/msg'); // Assuming this endpoint fetches messages
      if (response.ok) {
        const data = await response.json();
        setMessages(data); // Update messages state with fetched messages
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to delete a message
  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`/api/msg/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Filter out the deleted message from the state
        setMessages(messages.filter((msg) => msg._id !== id));
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Fetch messages when component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="message-container"> {/* Apply CSS class to container div */}
      <h2>Messages welcome</h2>
      <ul className="message-list"> {/* Apply CSS class to message list */}
        {messages.map((msg) => (
          <li key={msg._id} className="message-item"> {/* Apply CSS class to message item */}
            <strong>Fullname:</strong> {msg.fullname}<br />
            <strong>Email:</strong> {msg.email}<br />
            <strong>Message:</strong> {msg.message}<br />
            <strong>Number:</strong> {msg.number}<br />
            <button className="delete-button" onClick={() => deleteMessage(msg._id)}>Delete</button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageAdmin;
