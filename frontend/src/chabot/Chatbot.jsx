import { useState } from "react";
// import OpenAI from "openai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // const openai = new OpenAI({
  //   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  //   dangerouslyAllowBrowser: true, // only for testing (not production safe)
  // });

  const sendMessage = async () => {
    if (!input.trim()) return;

    // User ka message add karo
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

  //   try {
  //     const res = await openai.chat.completions.create({
  //       model: "gpt-4o-mini",
  //       messages: newMessages,
  //     });

  //     const reply = res.choices[0].message.content;
  //     setMessages([...newMessages, { role: "assistant", content: reply }]);
  //   } catch (err) {
  //     console.error(err);
  //     setMessages([
  //       ...newMessages,
  //       { role: "assistant", content: "⚠️ Error: Could not connect to AI." },
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  }
  return (
    <div>
      {/* Floating Button */}

     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-80 h-96 bg-white shadow-2xl rounded-2xl border flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-2xl flex justify-between">
            <h3 className="font-bold">AI ChatBot</h3>
            <button onClick={() => setIsOpen(false)}>❌</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-100 text-blue-900"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && <p className="text-gray-500">⏳ Typing...</p>}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-lg p-2 mr-2"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
