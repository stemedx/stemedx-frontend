"use client";

import Link from "next/link";
import { getTranslations } from "@/locales";
import { useLanguage } from "@/context/language-context";

interface PricingPlan {
  icon: string;
  title: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  button: string;
}

interface PricingContent {
  header: { title: string; subtitle: string };
  individualCourses: PricingPlan;
  monthlySubscription: PricingPlan;
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {[CONTENT.individualCourses, CONTENT.monthlySubscription].map((plan, planIndex) => (
            <div
              key={planIndex}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">{plan.icon}</div>
                <h2 className="text-3xl font-bold text-white mb-3">{plan.title}</h2>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                <div className="text-4xl font-bold text-white mb-2">{plan.price}</div>
                <p className="text-sm text-gray-400">{plan.priceNote}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
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
                {plan.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
