import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import LoginPage from "./Pages/LoginPage";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import UserAccount from "./UserAccount/UserAccount";
import Chatbot from "./ChatBot/Chatbot";
import BookingPage from "./Pages/BookingPage";
import ResetPassword from "./Pages/ResetPassword";
import TestingPage from "./Pages/TestingPage";
import RoverController from "./Pages/RoverController";
import { RiMessage2Line } from "react-icons/ri";
import Support from "./UserAccount/Support";

function App() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [islogin, SetIsLogin] = useState(false);
  const [userSidebar, setUserSidebar] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="app">
      <Navbar islogin={islogin} setUserSidebar={setUserSidebar} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              islogin={islogin}
              setUserSidebar={setUserSidebar}
              setShowChatbot={setShowChatbot}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/testing" element={<TestingPage />} />
        <Route path="/register" element={<BookingPage />} />
        <Route path="/help" element={<Support />} />
        <Route
          path="/chat"
          element={
            <Chatbot
              showChatbot={showChatbot}
              setShowChatbot={setShowChatbot}
            />
          }
        />
        <Route path="/controller" element={<RoverController />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route
          path="/login"
          element={
            <LoginPage
              islogin={islogin}
              SetIsLogin={SetIsLogin}
              name={name}
              email={email}
              setEmail={setEmail}
              setName={setName}
            />
          }
        />
      </Routes>

      {/* Chatbot toggler */}
      <div className="chatbot-toggler">
        <button
          onClick={() => {
            navigate("/chat");
            setShowChatbot(true);
          }}
          className={`chat-open ${showChatbot ? "active" : ""}`}
        >
          <RiMessage2Line className="icon" />
        </button>
      </div>

      {/* User Account component */}
      <UserAccount
        name={name}
        email={email}
        userSidebar={userSidebar}
        setUserSidebar={setUserSidebar}
        SetIsLogin={SetIsLogin}
      />

      <ToastContainer />
    </div>
  );
}

export default App;
