import React, { createContext, useState } from "react";
import run from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState(""); // This line remains unchanged
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Send a prompt to Gemini API
  const onSent = async (prompt) => {
    const message = prompt || input;
    if (!message.trim()) return;

    setInput("");
    setResultData("");
    setLoading(true);
    setShowResult(true);

    setPrevPrompts((prev) => [...prev, message]);
    setRecentPrompt(message);

    const reply = await run(message);
    setResultData(reply);
    setLoading(false);
  };

  // Start a new chat
  const newChat = () => {
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        onSent,
        recentPrompt,
        prevPrompts,
        showResult,
        loading,
        resultData,
        newChat,
        setRecentPrompt,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
