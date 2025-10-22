import React, { useRef } from "react";
import { MdArrowUpward } from "react-icons/md";
import "./Chatbot.css";
function ChatForm({ chatHistory, setChatHistory, genrateBotresponse }) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userMsg = inputRef.current.value.trim();
    if (!userMsg) return;
    inputRef.current.value = "";

    // Update the chatHistory with user's message
    setChatHistory((history) => [...history, { role: "user", text: userMsg }]);

    setTimeout(() => {
      // Add a Thinking... placeholder of bot's response
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      genrateBotresponse([
        ...chatHistory,
        {
          role: "model",
          text: `Using the details provided above, please address this query: ${userMsg}`,
        },
      ]);
    }, 200);
  };
  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button>
        <MdArrowUpward className="chat-icon" />
      </button>
    </form>
  );
}

export default ChatForm;
