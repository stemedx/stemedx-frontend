"use client";

import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { useRouter } from "next/navigation";

interface HomeProps {
  isAuthenticated: boolean;
}

export default function Home({ isAuthenticated }: HomeProps) {
  const router = useRouter();

  const handleStartLearning = (e: React.MouseEvent) => {
    if (isAuthenticated === true) {
      router.push('/courses');
    } else {
      router.push('/login?redirect=/courses');
    }
  };

  const CONTENT = getTranslations('home', CURRENT_LANGUAGE) as {
    hero: {
      title: string;
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
      <div className="relative block video-fade-overlay">
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center text-white max-w-4xl z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {CONTENT.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            <button
              onClick={handleStartLearning}
              className="glow-on-hover text-white px-4 py-2 rounded-3xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer inline-block mx-1"
            >
              Start Learning
            </button>
            {" "}with Sri Lanka&apos;s Premier Online ICT Learning Platform
          </p>
        </div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-screen object-cover block"
        >
          <source
            src="https://icwg9u8ngzketf8y.public.blob.vercel-storage.com/Reflect%20Notes.webm"
            type="video/webm"
          />
        </video>
      </div>

      <div className="relative z-20 -mt-35 bg-gradient-to-b from-transparent via-purple-900/50 to-black">
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

        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white pb-6 leading-tight">
                {CONTENT.stemJourney.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 pb-8 lg:pb-10 leading-relaxed">
                {CONTENT.stemJourney.description}
              </p>
              <button
                onClick={handleStartLearning}
                className="glow-on-hover text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl transition-all duration-300 hover:scale-105 inline-block text-center"
              >
                {CONTENT.stemJourney.button}
              </button>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src="/bg-image.png"
                alt="STEM Learning Workspace"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
