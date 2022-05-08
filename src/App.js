import React from "react";
import { ToastContainer } from "react-toast";
import GlobalStyles from 'styles/GlobalStyles';
import Home from "pages/Home.js";
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import ResearchPage from "pages/Research.js";
import AboutUsPage from "pages/AboutUs.js";
import ContactUsPage from "pages/ContactUs.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer delay={3000} position="top-right"/>
    </>
  );
}