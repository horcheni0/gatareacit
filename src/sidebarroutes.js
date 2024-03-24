import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import ContactUS from "views/admin/help";
import Chat from "views/admin/chat";
import Booth from "views/admin/Booth";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import CalendarComponent from "views/admin/calandar";
// Icon Imports
import {
  MdOutlineRemoveRedEye,
  MdFormatListNumberedRtl,
  MdHome,
  MdBarChart,
  MdPerson,
  MdEventAvailable,
  MdOutlineSms,
  MdHelp
  
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
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Manage Events",
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
    name: "Booth",
    layout: "/admin",
    path: "booth",
    icon: <MdOutlineRemoveRedEye className="h-6 w-6" />,
    component: <Booth />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Help",
    layout: "/admin",
    path: "help",
    icon: <MdHelp className="h-6 w-6" />,
    component: <ContactUS/>,
  },
 
];
export default routes;
