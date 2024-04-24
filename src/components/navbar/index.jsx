import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Profile from 'views/admin/profile'
import Dropdown from "components/dropdown";

import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {useLogout} from 'views/auth/hooks/useLogout'
import {useAuthContext} from 'views/auth/hooks/useAuthContext'
const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const {logout} = useLogout()
  const {user } = useAuthContext()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick= () =>{
    logout()
  }
  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic based on the searchQuery
    // For example, navigate to a search results page
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Dashboard
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[8px] flex h-[61px] w-[100px] flex-grow items-center justify-around gap-2 rounded-full  px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[165px] xl:gap-2" >
        
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src="http://res.cloudinary.com/dikpupfzu/image/upload/v1525474876/profile_avatar.png"
              alt="user logo"
            />
          }
          children={
            <div className="flex h-39 w-100 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="mt-3 ml-4">
                <div className="flex items-center gap-2">
                  {user && (
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      👋{user.email}
                    </p>
                  )}                  
                </div>             
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
              <div className="mt-3 ml-4 flex flex-col">
                <Link
                  to="#"
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  {Profile}
                </Link>               
                <a
                  onClick={handleClick}
                  href=" "
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
      
    </nav>
  );
};

export default Navbar;
