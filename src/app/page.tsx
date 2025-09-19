"use client";

import { LoginModal } from "@/app/components/loginModal";
import { useState } from "react";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const CONTENT = getTranslations('home', CURRENT_LANGUAGE) as {
    hero: {
      title: string;
      subtitle: string;
      buttons: { startLearning: string; takeTour: string };
    };
    whyChoose: {
      title: string;
      subtitle: string;
      features: {
        timeEfficient: { title: string; description: string };
        flexiblePace: { title: string; description: string };
        lifetimeAccess: { title: string; description: string };
      };
    };
    stemJourney: {
      title: string;
      description: string;
      button: string;
    };
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative">
        <div className="absolute top-20 sm:top-40 text-center text-white max-w-4xl z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {CONTENT.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {CONTENT.hero.subtitle}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => {
                console.log("Start Learning clicked");
                setIsLoginOpen(true);
              }}
              className="glass-button text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {CONTENT.hero.buttons.startLearning}
            </button>
          </div>
        </div>
        <div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="min-w-full min-h-full object-cover"
            style={{ width: '100vw', height: '100vh' }}
          >
            <source
              src="https://icwg9u8ngzketf8y.public.blob.vercel-storage.com/Reflect%20Notes.webm"
              type="video/webm"
            />
          </video>
        </div>
      </div>

      <div className="gradient-separator"></div>

      {/* Why Choose Section */}
      <div className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center pb-12 sm:pb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white pb-4">
              {CONTENT.whyChoose.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              {CONTENT.whyChoose.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary-gradient rounded-full flex items-center justify-center mx-auto pb-4">
                <span className="text-2xl sm:text-3xl text-white">⏰</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white pb-3">
                {CONTENT.whyChoose.features.timeEfficient.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300">
                {CONTENT.whyChoose.features.timeEfficient.description}
              </p>
            </div>

            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary-gradient rounded-full flex items-center justify-center mx-auto pb-4">
                <span className="text-2xl sm:text-3xl text-white">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white pb-3">
                {CONTENT.whyChoose.features.flexiblePace.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300">
                {CONTENT.whyChoose.features.flexiblePace.description}
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary-gradient rounded-full flex items-center justify-center mx-auto pb-4">
                <span className="text-2xl sm:text-3xl text-white">📚</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white pb-3">
                {CONTENT.whyChoose.features.lifetimeAccess.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300">
                {CONTENT.whyChoose.features.lifetimeAccess.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-separator"></div>

      <div className="relative">
        {/* Dramatic Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/10 to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent top-1/4"></div>
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent top-3/4"></div>
          <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-400 to-transparent left-1/4"></div>
          <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent right-1/4"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white pb-6 leading-tight">
                {CONTENT.stemJourney.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 pb-8 lg:pb-10 leading-relaxed">
                {CONTENT.stemJourney.description}
              </p>
              <button
                onClick={() => {
                  console.log("Get Started clicked");
                  setIsLoginOpen(true);
                }}
                className="bg-primary-gradient text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover-primary-gradient transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {CONTENT.stemJourney.button}
              </button>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <picture>
                  <img
                    src="/bg-image.png"
                    alt="STEM Learning Workspace"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    style={{ background: "transparent" }}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
