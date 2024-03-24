import React from "react";

// Admin Imports

import ProfileModal from "views/admin/profile"
 import GenderChar from "views/admin/gender"
import MainDashboard from "views/admin/default";
import Chat from "views/admin/chat";
import ContactUS from "views/admin/help";
import Booth from "views/admin/Booth";
import CalendarComponent from "views/admin/calandar";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import EventModal from "views/admin/events-manage/components/EventModel"
import SearchModal from "views/admin/tables/components/searchModel"

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdFormatListNumberedRtl,
  MdHome,
  MdBarChart,
  MdPerson,
  MdEventAvailable,
  MdLogout,
  MdOutlineSms,
  MdHelp
  
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
    name: "Modify Event",
    layout: "/admin",
    path: "event/edit/:id",
    icon: <MdEventAvailable className="h-6 w-6" />,
    component: <EventModal />,
  },
  {
    name: "Search",
    layout: "/admin",
    path: "Data Tables/search",
    icon: <MdEventAvailable className="h-6 w-6" />,
    component: <SearchModal />,
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
    icon: <MdEventAvailable  className="h-6 w-6" />,
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
    name: "Booth",
    layout: "/admin",
    path: "booth",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Booth />,
  },
  {
    name: "help",
    layout: "/admin",
    path: "help",
    icon: <MdHelp className="h-6 w-6" />,
    component: <ContactUS/>,
  },
 
];
export default routes;
