import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "views/auth/hooks/useAuthContext";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Page404 from "layouts/page404";

import ContactUS from "views/admin/help/index";

import Navbar from "./components/hommme/navbar";
import Header from "./components/hommme/header";
import PageHero from "./components/hommme/vd";
import PageSection from "./components/hommme/info";
import BannerHome from "./components/hommme/back";
import WelcomeSection from "./components/hommme/welcom";
import GeschäftsführungSection from "./components/hommme/der";
import OurTeamSection from "./components/hommme/monber";
import LatestNewsSection from "./components/hommme/news";
import BannerHomeSection from "./components/hommme/der2";
import Footer from "./components/hommme/foot";



const App = () => {
  const { user } = useAuthContext(); // Using a custom hook to get the user context

  return (
    <Routes>
      {/* Home Route (No Login Required) */}
      <Route path="/" element={<Home />} />

      {/* Route for authentication pages */}
      <Route
        path="auth/*"
        element={!user ? <AuthLayout /> : <Navigate to="/admin/default" />}
      />

      {/* Route for admin-specific pages */}
      <Route
        path="admin/*"
        element={
          user ? <AdminLayout /> : <Navigate to="/auth/sign-in" />
        }
      />

      {/* Default route redirects to 404 page */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

const Home = () => {
  return (
    <div>
      
      <Navbar />
      <Header />
      <PageHero />
      <PageSection />
      <BannerHome />
      <WelcomeSection />
      <GeschäftsführungSection />
      <OurTeamSection />
      <LatestNewsSection />
      <BannerHomeSection />
      <ContactUS />
      <Footer />
    
      
    </div>
  );
};

export default App;
