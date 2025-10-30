import { useState } from "react";
import { Send } from "lucide-react";

export default function EnquiryChat() {
  const [data, setData] = useState({
    user_id: "",
    institute_id: { name: "Brington INC" },
    user: "Viveka",
    email: "viveka@gmail.com",
    phone: "5678934578",
    createdAt: "2025-10-28 21:00:00",
    date: "2025-10-28 21:00:00",
    subject: "Fees Details",
    messages: [
      {
        sender_type: "user",
        date: "2025-10-28 21:00:00",
        message: "Hello, I want to know the fees detail of B.ED course",
      },
      {
        sender_type: "institute",
        date: "2025-10-28 21:05:00",
        message: "We are charging ₹50,000 for the B.ED Course.",
      },
      {
        sender_type: "user",
        message: "₹50,000 is more. Can we negotiate?",
      },
      {
        sender_type: "institute",
        message: "Yes, please come directly to our institute.",
      },
      {
        sender_type: "user",
        message: "Ok",
      },
      {
        sender_type: "user",
        message: "Hey, where is your institute?",
      },
    ],
  });

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const updated = {
      ...data,
      messages: [
        ...data.messages,
        { sender_type: "institute", message: newMessage, date: new Date().toISOString() },
      ],
    };
    setData(updated);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f5f5] p-6">
      {/* Header */}
      <div className="max-w-2xl w-full bg-[#824572] text-white p-4 rounded-t-2xl shadow-md">
        <h2 className="text-xl font-semibold">{data.institute_id.name}</h2>
        <p className="text-sm opacity-90">Enquiry: {data.subject}</p>
      </div>

      {/* Chat Body */}
      <div className="max-w-2xl w-full bg-white h-[500px] overflow-y-auto p-4 border-x border-b border-[#e0d5d5] rounded-b-2xl shadow-md">
        {data.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              msg.sender_type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.sender_type === "user"
                  ? "bg-[#824572] text-white rounded-br-none"
                  : "bg-[#cd9bc0] text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.message}
              {msg.date && (
                <div className="text-[10px] opacity-70 mt-1 text-right">
                  {new Date(msg.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="max-w-2xl w-full flex items-center mt-4 bg-white border border-[#e5dede] rounded-full px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow outline-none text-gray-700 text-sm px-2"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-[#7d5454] text-white p-2 rounded-full hover:bg-[#6a4545] transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
