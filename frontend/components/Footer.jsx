import React from "react";

const Footer = ({ inputValue, setInputValue, sendMessage, isConnected }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 border-t border-gray-700 bg-gray-900"
    >
      <textarea
        className="flex-1 resize-none rounded-md p-2 text-sm bg-gray-700 text-white outline-none"
        rows={1}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        type="submit"
        disabled={!isConnected || !inputValue.trim()}
        className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default Footer;
