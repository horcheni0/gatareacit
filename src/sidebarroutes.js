import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

import Chat from "views/admin/chat";

import Profile from "views/admin/profile";

import CalendarComponent from "views/admin/calandar";
import Signup from "views/auth/Signup";
import MessageAdmin from "views/admin/message/message_admin";
// Icon Imports
import {
  MdOutlineRemoveRedEye,
  MdFormatListNumberedRtl,
  MdHome,
  MdPerson,
  MdEventAvailable,
  MdOutlineSms,
  
  
} from "react-icons/md";
import ManagaEvent from "views/admin/events-manage";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },

  {
    name: "Manage event",
    layout: "/admin",
    icon: <MdFormatListNumberedRtl className="h-6 w-6"/>,
    path: "events-manage",
    component: <ManagaEvent/>,
  },
  {
    name: "calendar",
    layout: "/admin",
    path: "calendar",
    icon: <MdEventAvailable  className="h-6 w-6" />,
    component: <CalendarComponent />,
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
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Reading requests  ",
    layout: "/admin",
    path: "help",
    icon: <MdOutlineRemoveRedEye className="h-6 w-6" />,
    component: <MessageAdmin />,
    
  },
 
];
export default routes;
