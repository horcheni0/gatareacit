import profile from "assets/img/avatars/profile.png";
import React, { useState, useEffect } from 'react';
import ProfileModal from './profileModel';
const ProfileOverview = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('user'))?.id || '';
    console.log(id)
    
    if (!id) {
      setError(new Error("No id found in localStorage"));
      setIsLoading(false);
      return;
    }
    fetch(`/api/user/profile/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve user profile data");
        }
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex">
    <div className=" sm:w-[90%] md:w-[100%] lg:w-[99%] h-[50vh] sm:h-[60vh] lg:h-[80vh] shadow-[0px_6px_16px_rgba(98,100,108,0.5)] mt-9 mb-10 rounded-2xl flex w-full sm:w-90% lg:w-99% h-50vh sm:h-50vh lg:h-50vh shadow-0px_6px_16px_rgba(98,100,108,0.5)  justify-center items-center">
      <div className=" w-[400px] bg-[#6c63ff] ml-[-250px] h-full">
      <img className="avatar mt-[50px] h-[20vh] ml-[90px]" src={profile} alt=""   />
      </div>
      <div className="right w-[500px]">
        <h1 className="text-center mt-[-10px] font-semibold text-[1.95rem]	dark:text-gray-600">Profile Settings</h1>
        <div className="form  w-[310px] ml-[100px] mb-10">
            <form>
              <div className="field">
                <label htmlFor="" className="tracking-[0.75px] text-[0.9rem] text-[#888cbd] opacity-70">First Name</label>
                <input className="full_name w-[350px] bg-white  tracking-[0.29px] text-[#292b43] text-[0.95rem] font-semibold ml-0 pt-4 pb-[5px] border-b-2 border-b-[#eaeaea] border-[none] border-solid;
  outline: none"
                  type="text"
                  name="full-name"
                  defaultValue={user.firstname}
                />
              </div>
              <div className="field">
                <label htmlFor=""  className="tracking-[0.75px] text-[0.9rem] text-[#888cbd] opacity-70">Last Name</label>
                <input className="full_name w-[350px] bg-white rounded tracking-[0.29px] text-[#292b43] text-[0.95rem] font-semibold ml-0 pt-4 pb-[5px] border-b-2 border-b-[#eaeaea] border-[none] border-solid; outline: none"
                  type="text"
                  name="full-name"
                  defaultValue={user.lastname} />
              </div>
              <div className="field">
                <label htmlFor=""  className="tracking-[0.75px] text-[0.9rem] text-[#888cbd] opacity-70">Email</label>
                <input class="full_name w-[350px] bg-white rounded tracking-[0.29px] text-[#292b43] text-[0.95rem] font-semibold ml-0 pt-4 pb-[5px] border-b-2 border-b-[#eaeaea] border-[none] border-solid;outline: none"
                  type="text"
                  name="full-name"
                  defaultValue={user.email} />
              </div>
              <div className="field">
                <label htmlFor=""  className="tracking-[0.75px] text-[0.9rem] text-[#888cbd] opacity-70">Password</label>
                <input className="full_name w-[350px] rounded bg-white tracking-[0.29px] text-[#292b43] text-[0.95rem] font-semibold ml-0 pt-4 pb-[5px] border-b-2 border-b-[#eaeaea] border-[none] border-solid;
  outline: none"  
                  type="text"
                  name="full-name"
                  placeholder="Click on reset pasword to show it" />
              </div>
            </form>
        </div>
        <div className="bottom ml-[50px]">
          <button  onClick={() => setIsModalOpen(true)} className="button_left w-[120px] h-[45px] rounded bottom-5  bg-[#6c63ff] text-sm text-white tracking-[0.5px] font-light ml-[150px]" type="submit" name="button">Modify</button>
          <button className="button_right bg-[#6b63ff64]  rounded  text-sm tracking-[0.3px] font-light text-[#040615] opacity-80  w-[120px] h-[45px] ml-[10px]  " type="cancel" name="button">Reset password</button>
        </div>
      </div>
    </div>
    {isModalOpen && (
  <div className='modal'>
    <div className='modal-content border-x-violet-800	'>
      <span className='close' onClick={() => setIsModalOpen(false)}>
        &times;
      </span>
      <ProfileModal handleClose={handleCloseModal} user={user} />
    </div>
  </div>
)}
    </div>
  );
};

export default ProfileOverview;
