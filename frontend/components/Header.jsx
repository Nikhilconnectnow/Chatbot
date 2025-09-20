import React from 'react'

const Header = ({isConnected}) => {
  return (
      <div className="flex items-center gap-2 p-3 border-b border-gray-700 bg-gray-900">
      {/* status dot */}
      <div
        className={`w-3 h-3 rounded-full ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <h1 className="text-white font-semibold">AI Chatbot</h1>
      <span className="ml-auto text-sm text-gray-400">
        {isConnected ? "Connected" : "Disconnected"}
      </span>
    </div>
  )
}

export default Header