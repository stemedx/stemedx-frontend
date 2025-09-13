"use client";

import { LoginModal } from "@/app/components/loginModal";
import { useState } from "react";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="https://icwg9u8ngzketf8y.public.blob.vercel-storage.com/bg.mp4"
            type="video/mp4"
          />
        </video>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              Welcome to StemXio
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Master STEM skills online with interactive courses, virtual labs,
              and expert instruction
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                Start Learning Online
              </button>
              <button className="bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-500/30 transition-all duration-300 hover:scale-105">
                Take a Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections Below */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Online Learning with StemXio?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience flexible, interactive online education that fits your
              schedule and learning style
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Virtual Labs
              </h3>
              <p className="text-gray-600">
                State-of-the-art online laboratories accessible 24/7 from
                anywhere
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Live Online Sessions
              </h3>
              <p className="text-gray-600">
                Interactive classes with industry experts and personalized
                feedback
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Flexible Learning
              </h3>
              <p className="text-gray-600">
                Learn at your own pace with lifetime access to course materials
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Start Your Online STEM Journey
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of students learning online with flexible
                scheduling, expert support, and career-focused curriculum
                designed for working professionals.
              </p>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105"
              >
                Get Started Free
              </button>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                What you&apos;ll get:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    500+ online courses and tutorials
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    24/7 access to virtual labs
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Online mentorship and career guidance
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Certificate of completion
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
