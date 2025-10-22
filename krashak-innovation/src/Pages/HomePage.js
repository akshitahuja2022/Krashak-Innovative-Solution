import React from "react";
import Hero from "../Component/Hero";
import About from "../Component/About";
import Feature from "../Component/Feature";
import Service from "../Component/Service";
import Contact from "../Component/Contact";
import Footer from "../Component/Footer";

function HomePage({ islogin, setUserSidebar, setShowChatbot }) {
  return (
    <div>
      <Hero islogin={islogin} setUserSidebar={setUserSidebar} />
      <Feature />
      <About islogin={islogin} />
      <Service islogin={islogin} />
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;
