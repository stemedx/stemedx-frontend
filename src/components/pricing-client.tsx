"use client";

import Link from "next/link";
import { getTranslations } from "@/locales";
import { useLanguage } from "@/context/language-context";

interface PricingContent {
  header: { title: string; subtitle: string };
  individualCourses: {
    icon: string;
    title: string;
    description: string;
    price: string;
    priceNote: string;
    features: string[];
    button: string;
  };
}

export default function Pricing() {
  const { language } = useLanguage();
  const CONTENT = getTranslations('pricing', language) as PricingContent;

  return (
    <div className="py-10 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center pb-12 sm:pb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white pb-4">
            {CONTENT.header.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {CONTENT.header.subtitle}
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{CONTENT.individualCourses.icon}</div>
              <h2 className="text-3xl font-bold text-white mb-3">
                {CONTENT.individualCourses.title}
              </h2>
              <p className="text-gray-300 mb-6">
                {CONTENT.individualCourses.description}
              </p>
              <div className="text-4xl font-bold text-white mb-2">
                {CONTENT.individualCourses.price}
              </div>
              <p className="text-sm text-gray-400">{CONTENT.individualCourses.priceNote}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {CONTENT.individualCourses.features.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <span className="text-green-400 mr-3 text-xl">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/courses"
              className="block w-full text-center bg-primary-gradient text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-500/50"
            >
              {CONTENT.individualCourses.button}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
