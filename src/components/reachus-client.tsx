"use client";

import { useState } from "react";
import Link from "next/link";
import { ChatWidget } from "@/components/ui/chat-widget";
import { Toast } from "@/components/ui/toast";
import { useLanguage } from "@/context/language-context";
import { getTranslations } from "@/locales";

interface ContactMethod {
  id: string;
  icon: string;
  title: string;
  content: string;
  action: string | null;
  enabled: boolean;
}

interface ReachUsContent {
  header: {
    title: string;
    subtitle: string;
    subtitleBefore: string;
    subtitleLinkText: string;
    subtitleAfter: string;
  };
  contactInfo: {
    methods: ContactMethod[];
  };
}

export function ReachUsClient() {
  const { language } = useLanguage();
  const content = getTranslations('reachus', language) as ReachUsContent;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "" });

  const handleCopyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({ isVisible: true, message: `${type} copied to clipboard` });
    } catch {
      setToast({ isVisible: true, message: `Failed to copy ${type.toLowerCase()}` });
    }
  };

  return (
    <div className="pt-4 pb-10">
      <div className="mb-10">
        <div className="max-w-7xl mx-auto text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{content.header.title}</h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90">
            {content.header.subtitle}
            <br />
            {content.header.subtitleBefore}{" "}
            <Link href="/courses" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">
              {content.header.subtitleLinkText}
            </Link>{" "}
            {content.header.subtitleAfter}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 p-8 sm:p-12">
            {content.contactInfo.methods
              .filter((method) => method.enabled)
              .map((method) => {
                const isLiveChat = method.id === "live-chat";
                const isHotline = method.id === "hotline";
                const isClickable = !!method.action || isLiveChat || isHotline;
                const Component = method.action && !isLiveChat && !isHotline ? "a" : "div";

                const handleClick = () => {
                  if (isLiveChat) {
                    setIsChatOpen(true);
                  } else if (isHotline) {
                    handleCopyToClipboard(method.content, "Phone number");
                  }
                };

                return (
                  <Component
                    key={method.id}
                    href={!isLiveChat && !isHotline ? method.action || undefined : undefined}
                    onClick={isLiveChat || isHotline ? handleClick : undefined}
                    className={`flex flex-col items-center text-center transition-all duration-300 group ${
                      isClickable ? "cursor-pointer hover:-translate-y-1 hover:scale-105" : ""
                    }`}
                  >
                    <div className="bg-secondary-gradient flex flex-col items-center justify-center text-center h-full w-full rounded-xl p-6 sm:p-8 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-3xl sm:text-4xl text-white mb-3">{method.icon}</div>
                      <h3 className="font-semibold text-white mb-3 sm:mb-4 text-lg sm:text-xl">
                        {method.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/80 whitespace-pre-line leading-relaxed">
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
