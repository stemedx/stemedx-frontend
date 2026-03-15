"use client";

import { useRouter } from "next/navigation";

export default function Pricing() {
  const router = useRouter();

  return (
    <div className="py-10 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center pb-12 sm:pb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white pb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Individual Courses */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Individual Courses
              </h2>
              <p className="text-gray-300 mb-6">
                Pay as you learn. Purchase courses individually.
              </p>
              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                  Varies by Course
                </div>
                <p className="text-sm text-gray-400">One-time payment per course</p>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>Lifetime access to purchased courses</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>Certificate of completion</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>Course materials & resources</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>Community support</span>
              </li>
            </ul>

            <button
              onClick={() => router.push('/courses')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-500/50"
            >
              Browse Courses
            </button>
          </div>

          {/* Full Platform Access */}
          <div className="bg-white/10 backdrop-blur-xl border-2 border-purple-500 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                MOST POPULAR
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Full Platform Access
              </h2>
              <p className="text-gray-300 mb-6">
                Unlimited access to all courses and future content.
              </p>
            </div>

            {/* Pricing Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-sm text-gray-400 mb-2">Monthly</div>
                <div className="text-3xl font-bold text-white mb-1">
                  LKR 2,999
                </div>
                <div className="text-xs text-gray-400">per month</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-2xl p-6 text-center relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Save 30%
                </div>
                <div className="text-sm text-gray-400 mb-2">Yearly</div>
                <div className="text-3xl font-bold text-white mb-1">
                  LKR 24,999
                </div>
                <div className="text-xs text-gray-400">per year</div>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>Access to ALL courses</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>New courses added regularly</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>All certificates included</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>Exclusive live sessions</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-green-400 mr-3 text-xl">✓</span>
                <span>Download course materials</span>
              </li>
            </ul>

            <div className="space-y-3">
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/50"
              >
                Get Started - Monthly
              </button>
              <button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-green-500/50"
              >
                Get Started - Yearly (Save 30%)
              </button>
            </div>
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            All plans include a 7-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
