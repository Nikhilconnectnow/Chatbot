import React, { useEffect, useRef } from "react";

const MessagesArea = ({ messages, isLoading }) => {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-800">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[75%] p-2 rounded-lg text-sm whitespace-pre-wrap ${
            msg.role === "user"
              ? "bg-blue-600 text-white self-end ml-auto"
              : "bg-gray-700 text-gray-200"
          }`}
        >
          {msg.text}
        </div>
      ))}

      {/* loading bubble */}
      {isLoading && (
        <div className="bg-gray-700 text-gray-200 p-2 rounded-lg inline-flex items-center gap-2">
          <span className="animate-pulse">Thinking...</span>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessagesArea;
