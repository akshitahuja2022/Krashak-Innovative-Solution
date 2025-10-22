import React, { useEffect, useRef, useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import "./Chatbot.css";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import companyInfo from "../ChatBot/CompanyInfo";
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Chatbot({ showChatbot, setShowChatbot }) {
  const navigate = useNavigate();
  const chatBodyRef = useRef();
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "Model",
      text: companyInfo,
    },
  ]);

  // Helper function to update history
  const updateHistory = (text, isError = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking..."),
      { role: "model", text, isError },
    ]);
  };

  const genrateBotresponse = async (history) => {
    // Format chat history for api response
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong");
      // clean and update chatHistory with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    // Auto scroll whenever chat history updates
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="container">
      <div className={`chatbot-popup`}>
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <IoChatboxEllipses className="chat-icon" />
            <h2 className="logo-text">ChatBot</h2>
          </div>
          <div
            onClick={() => {
              navigate("/");
              setShowChatbot(false);
            }}
            className="chat-remove"
          >
            <FaAngleDown />
          </div>
        </div>
        {/* Chatbot body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <IoChatboxEllipses className="chat-icon" />
            <p className="message-text">
              Hey there 👋 <span>How can I help today?</span>
            </p>
          </div>

          {/* Render the chatHistory dynamically */}
          {chatHistory.map((chat, index) => {
            return <ChatMessage key={index} chat={chat} />;
          })}
        </div>

        {/* Chatbot-footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            genrateBotresponse={genrateBotresponse}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
