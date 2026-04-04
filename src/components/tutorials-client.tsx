"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { getTranslations } from "@/locales";

interface TutorialsContent {
  comingSoon: {
    title: string;
    description: string;
    button: string;
  };
}

export default function Tutorials() {
  const { language } = useLanguage();
  const CONTENT = getTranslations('tutorials', language) as TutorialsContent;

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
          <div className="text-8xl mb-6 animate-bounce">🚀</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-primary-gradient">
            {CONTENT.comingSoon.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {CONTENT.comingSoon.description}
          </p>
          <Link
            href="/courses"
            className="inline-block bg-primary-gradient text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/50"
          >
            {CONTENT.comingSoon.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
