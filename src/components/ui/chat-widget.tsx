"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export function ChatWidget({ isOpen: controlledIsOpen, onToggle }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello! Welcome to ${BRAND.name}. How can I help you today?`,
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    onToggle ? onToggle(newIsOpen) : setInternalIsOpen(newIsOpen);
    setIsMinimized(false);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Thank you for your message. Our support team will get back to you shortly.",
        sender: 'agent',
        timestamp: new Date()
      }]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button - centered below cards */}
      <div className="flex justify-center pt-10">
        <button
          onClick={handleToggle}
          className="bg-primary-gradient text-white px-4 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 hover-primary-gradient flex items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{isOpen ? "Close" : "Chat"}</span>
        </button>
      </div>

      {/* Chat window - fixed bottom right */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50">
          <div className={`bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
            isMinimized ? 'w-[calc(100vw-2rem)] sm:w-80 h-16' : 'w-[calc(100vw-2rem)] sm:w-80 h-96'
          } flex flex-col`}>
            <div className="bg-primary-gradient text-white p-4 rounded-t-2xl flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{BRAND.name} Support</h3>
                  <p className="text-xs text-white/80">Online now</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggle}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                            message.sender === 'user'
                              ? 'bg-primary-gradient text-white'
                              : 'bg-white text-gray-800 shadow-sm'
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="p-4 border-t rounded-b-2xl shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-primary-gradient text-white p-2 rounded-lg hover-primary-gradient transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
