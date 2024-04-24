import React from "react";

// Admin Imports

import ProfileModal from "views/admin/profile";
 import GenderChar from "views/admin/gender";
import MainDashboard from "views/admin/default";
import Chat from "views/admin/chat";

import CalendarComponent from "views/admin/calandar";
import Profile from "views/admin/profile";

import EventModal from "views/admin/events-manage/components/EventModel";

import Signup from "views/auth/Signup";
import MessageAdmin from "views/admin/message/message_admin";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdFormatListNumberedRtl,
  MdHome,
  
  MdPerson,
  MdEventAvailable,
  MdLogout,
  MdOutlineSms,
  MdOutlineRemoveRedEye,
 
  
} from "react-icons/md";
import SignUp from "views/auth/Signup";
import ManagaEvent from "views/admin/events-manage";
import Calandar from "views/admin/calandar";

const routes = [
  // exhibitor
  {
    name: "Gender",
    layout: "/admin",
    path: "gender",
    icon: <MdHome className="h-6 w-6" />,
    component: <GenderChar />,
  },
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
 
 
  {
    name: "Manage Events",
    layout: "/admin",
    icon: <MdFormatListNumberedRtl className="h-6 w-6"/>,
    path: "events-manage",
    component: <ManagaEvent/>,
  },
  {
    name: "Modify Event",
    layout: "/admin",
    path: "event/edit/:id",
    icon: <MdEventAvailable className="h-6 w-6" />,
    component: <EventModal />,
  },

  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ProfileModal />,
  },
  {
    name: "Log out",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignIn />,
  },
  
  {
    name: "calendar",
    layout: "/admin",
    path: "calendar",
    icon: <Calandar  className="h-6 w-6" />,
    component:< CalendarComponent />,
  },
  {
    name: "sign up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignUp />,
  },
  {
    name: "Chat",
    layout: "/admin",
    path: "chat",
    icon: <MdOutlineSms className="h-6 w-6" />,
    component: <Chat />,
  },
  {
    name: "add users",
    layout: "/admin",
    path: "booth",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Signup />,
  },
  {
    name: "Reading requests ",
    layout: "/admin",
    path: "help",
    icon: <MdOutlineRemoveRedEye className="h-6 w-6" />,
    component: <MessageAdmin />,
    
  },
 
];
export default routes;
