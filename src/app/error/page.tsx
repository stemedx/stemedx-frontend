"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-300">
            We encountered an error while processing your request. Please try again.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-primary-gradient text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
