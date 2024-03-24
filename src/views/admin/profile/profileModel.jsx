import React, { useState } from "react";

import { useAuthContext } from 'views/auth/hooks/useAuthContext';
//import { AuthContext } from "views/auth/context/AuthContext";
const ProfileModal = ({ handleClose, user }) => {
  const {  dispatch } = useAuthContext();
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const userString = localStorage.getItem('user');
  const user1= JSON.parse(userString);
  const token = user1.token;
  //console.log(token)
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("handleSubmit function called");
    const profileData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
    };
    const userId = JSON.parse(localStorage.getItem('user'))?.id || '';
    if ( userId) {
      try {
         const response = await fetch(`/api/user/profile/${userId}`, {
          method: "PATCH",
          body: JSON.stringify(profileData),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
        console.log("response status:", response.status);
        const responseData = await response.json();
        console.log("responseData:", responseData);
        if (!response.ok) {
          throw new Error(
            responseData.message || "Failed to update profile"
          );
        }
        dispatch({
          type: "UPDATE_USER",
          payload: responseData,
        });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Auth token not available');
    }
  }
  return (
    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
      <div className="rounded-md bg-white p-8 border-2 shadow-lg border-purple-700">
        <h2 className="mb-4 text-xl font-semibold text-center text-purple-700">
          Modify Profile
        </h2>
        <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); console.log("form submitted");handleSubmit(e);}}>
          <label >
            First Name: 
            <input
            className=" ml-3 w-[250px]"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
            className=" ml-3 w-[250px]"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
            className=" ml-3 w-[250px]"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <p className="font-bold">You cannot change your password.</p>
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
export default ProfileModal;
