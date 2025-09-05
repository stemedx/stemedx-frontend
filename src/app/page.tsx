"use client";
import { HomeNavigation } from "@/components/nav-bar";
import { LoginModal } from "@/components/login-modal";
import { useState } from "react";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
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

        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        <HomeNavigation onLearnClick={() => setIsLoginOpen(true)} />

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              Welcome to StemXio
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Empowering the next generation of innovators through cutting-edge
              STEM education
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                Start Learning
              </button>
              <button className="bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-500/30 transition-all duration-300 hover:scale-105">
                Watch Demo
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
              Why Choose StemXio?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover innovative learning experiences designed to prepare you
              for the future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Interactive Labs
              </h3>
              <p className="text-gray-600">
                Hands-on virtual laboratories that bring complex concepts to
                life
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Expert Instructors
              </h3>
              <p className="text-gray-600">
                Learn from industry professionals and academic experts
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Real Projects
              </h3>
              <p className="text-gray-600">
                Work on actual industry projects and build your portfolio
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
                Start Your Journey Today
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of students who have transformed their careers
                through our comprehensive STEM programs. From beginner to
                expert, we have the right path for you.
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
                  <span className="text-gray-700">Access to 500+ courses</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Virtual lab environments
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span className="text-gray-700">1-on-1 mentorship</span>
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
