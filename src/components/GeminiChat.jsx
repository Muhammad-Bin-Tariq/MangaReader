import React, { useState } from "react";

const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const geminiApi = "";
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApi}`;

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage = { sender: "user", text: userMessage };
    setMessages([...messages, newMessage]);
    setUserMessage("");

    try {
      const response = await fetch(geminiApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from Gemini API");
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Extract the generated text from the API response
      const geminiReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't process that.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "gemini", text: geminiReply },
      ]);
    } catch (error) {
      console.error("Error fetching Gemini data:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "gemini",
          text: "There was an error processing your request.",
        },
      ]);
    }
  };

  return (
    <div>
      <div
        className="fixed bottom-5 right-5 bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer z-50"
        onClick={toggleChat}
      >
        💬
      </div>

      {isOpen && (
        <div
          className="fixed bottom-16 right-5 bg-gray-800 text-white w-80 h-96 rounded-lg shadow-lg flex flex-col z-50"
          style={{ overflow: "hidden" }}
        >
          <div className="bg-blue-600 p-3 flex">
            <h2 className="text-lg font-bold mb-2">Gemini Chat </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[250px] ${
                  message.sender === "user"
                    ? "bg-blue-500 self-end ml-auto"
                    : "bg-gray-700 self-start mr-auto"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="p-2 bg-gray-900 flex items-center">
            <input
              type="text"
              className="flex-1 p-2 rounded-md text-black"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
