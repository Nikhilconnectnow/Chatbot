import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Header from "../components/Header";
import MessagesArea from "../components/MessagesArea";
import Footer from "../components/Footer";

 const socket = io( import.meta.env.backendurl, {
  transports: ["websocket"], // optional but stable
  reconnection: true,
})

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("reply", (text) => {
      setMessages((prev) => [...prev, { role: "assistant", text }]);
      setIsLoading(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("reply");
    };
  }, []);

  const sendMessage = () => {
    const userMsg = inputValue.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInputValue("");
    setIsLoading(true);

    socket.emit("recived", userMsg);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border border-gray-700 rounded-lg overflow-hidden">
      <Header isConnected={isConnected} />
      <MessagesArea messages={messages} isLoading={isLoading} />
      <Footer
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        isConnected={isConnected}
      />
    </div>
  );
};

export default App;
