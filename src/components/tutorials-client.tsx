"use client";

export default function Tutorials() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
          <div className="text-8xl mb-6 animate-bounce">🚀</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Coming Soon!
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            We're working hard to bring you an amazing tutorial experience.
            Physical books and materials will be available soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/courses'}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/50"
            >
              Browse Online Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
