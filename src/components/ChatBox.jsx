import React from "react";
import { FiSend } from "react-icons/fi";

const ChatBox = ({
  activeChat,
  chatMessages,
  userMessage,
  aiLoading,
  setUserMessage,
  handleSendMessage,
}) => (
  <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 p-4 border-t border-gray-700">
    <div className="max-w-4xl mx-auto">
      <div className="h-64 overflow-y-auto bg-gray-900 rounded-lg p-4 mb-4">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-green-300"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {aiLoading && (
          <div className="text-left mb-2">
            <span className="inline-block px-4 py-2 rounded-lg bg-gray-700 text-green-300 animate-pulse">
              AI is typing...
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder={`Message ${activeChat.name}...`}
          className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={aiLoading}
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          disabled={aiLoading}
        >
          <FiSend />
        </button>
      </div>
    </div>
  </div>
);

export default ChatBox;