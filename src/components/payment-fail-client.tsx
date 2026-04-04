"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { getTranslations } from "@/locales";
import { paymentContent } from "@/locales/en/payment";

type PaymentContent = typeof paymentContent;

export function PaymentFailClient() {
  const { language } = useLanguage();
  const CONTENT = getTranslations("payment", language) as PaymentContent;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            {CONTENT.failure.title}
          </h1>
          <p className="text-gray-300 leading-relaxed">{CONTENT.failure.message}</p>
        </div>

        <Link
          href="/courses"
          className="block w-full bg-primary-gradient text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          {CONTENT.failure.courseButton}
        </Link>
      </div>
    </div>
  );
}
