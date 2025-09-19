"use client";

import { useState } from "react";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { ChatWidget } from "@/app/components/chat-widget";
import { Toast } from "@/app/components/toast";

// Get translations for this page
const CONTENT = getTranslations("reachus", CURRENT_LANGUAGE) as {
  header: {
    title: string;
    subtitle: string;
  };
  contactInfo: {
    methods: Array<{
      id: string;
      icon: string;
      title: string;
      content: string;
      action: string | null;
      enabled: boolean;
    }>;
  };
};

export default function ReachUs() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "" });

  const handleCopyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({
        isVisible: true,
        message: `${type} copied to clipboard`
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setToast({
        isVisible: true,
        message: `Failed to copy ${type.toLowerCase()}`
      });
    }
  };

  return (
    <div className="pt-24 pb-10">
      <div className="mb-10">
        <div className="max-w-7xl mx-auto text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{CONTENT.header.title}</h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90">{CONTENT.header.subtitle}</p>
        </div>
      </div>

      <div className="space-y-10 mx-auto max-w-7xl px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 p-6 sm:p-8">
            {CONTENT.contactInfo.methods
              .filter((method) => method.enabled)
              .map((method, index) => {
                const isLiveChat = method.id === "live-chat";
                const isAddress = method.id === "address";
                const isHotline = method.id === "hotline";
                const Component =
                  method.action && !isLiveChat && !isAddress && !isHotline
                    ? "a"
                    : "div";

                const handleClick = () => {
                  if (isLiveChat) {
                    setIsChatOpen(true);
                  } else if (isAddress || isHotline) {
                    const type = isAddress ? "Address" : "Phone number";
                    handleCopyToClipboard(method.content, type);
                  }
                };

                return (
                  <Component
                    key={index}
                    href={
                      !isLiveChat && !isAddress && !isHotline
                        ? method.action || undefined
                        : undefined
                    }
                    onClick={
                      isLiveChat || isAddress || isHotline
                        ? handleClick
                        : undefined
                    }
                    className={`flex flex-col items-center text-center transition-all duration-300 group ${
                      method.action || isLiveChat || isAddress || isHotline
                        ? "cursor-pointer hover:-translate-y-1 hover:scale-105"
                        : ""
                    }`}
                  >
                    <div className="bg-secondary-gradient flex flex-col items-center justify-center text-center h-full w-full rounded-xl p-3 sm:p-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-2xl sm:text-3xl text-white">{method.icon}</div>
                      <h3 className="font-semibold text-white mb-2 sm:mb-3 text-base sm:text-lg">
                        {method.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 whitespace-pre-line leading-relaxed">
                        {method.content}
                      </p>
                    </div>
                  </Component>
                );
              })}
          </div>
        </div>
      </div>

      <ChatWidget isOpen={isChatOpen} onToggle={setIsChatOpen} />
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ isVisible: false, message: "" })}
      />
    </div>
  );
}
