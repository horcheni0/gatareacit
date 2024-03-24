import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

function Chat(props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const messagesEndRef = useRef(null);

  const id = JSON.parse(localStorage.getItem('user'))?.id || '';
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
          //setSelectedUserId(searchedUser._id);
          setSearchedUser(searchedUser); 
          console.log(searchedUser);
        } else {
          setSearchedUser(null); 
          console.log('User not found');
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
    axios.post(`/api/msg/${id}`, {
      otherUserId: id,
      message: "Hello, this is a message from the current user."
    })
    .then((response) => {
      console.log(response.data.msg);  // Message added successfully
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='flex h-[45rem] mt-6 '>
      <div className='bg-white w-1/3 rounded '>
        <div>
        <p className="text-center	text-2xl mt-6 font-extrabold">Contacts</p>
        <div className="flex">
        <input className="mt-6 ml-9 border border-indigo-700 w-96 h-9 rounded-lg" type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <button className="bg-purple-300 mt-6 w-13 h-9 rounded-lg" type="submit" onClick={handleSearchSubmit}>Search</button>
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
         </div>
  );
}

export default Chat;