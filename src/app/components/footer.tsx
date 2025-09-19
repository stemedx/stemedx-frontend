"use client";

import Link from "next/link";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Icon mapping with react-icons
const iconMap = {
  Facebook: FaFacebook,
  X: FaXTwitter,
  MessageCircle: FaWhatsapp,
  Send: FaTelegram,
};

export function Footer() {
  const CONTENT = getTranslations('reachus', CURRENT_LANGUAGE) as {
    community?: {
      title: string;
      socialLinks: Array<{
        name: string;
        icon: string;
        url: string;
      }>;
    };
  };

  return (
    <div className="glass border-t border-t-white/20 rounded-t-2xl py-5 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col md:items-start justify-start items-center">
            <Link href="/" className="text-3xl font-bold text-white mb-4">
              steMEdx
            </Link>
            <p className="text-white/80 text-sm text-center md:text-left">
              Master STEM skills online with interactive courses and expert
              instruction
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start justify-start space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              Quick Links
            </h3>
            <div className="space-y-2 text-center md:text-left">
              <Link
                href="/courses"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Courses
              </Link>
              <Link
                href="/reachus"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Reach Us
              </Link>
              <Link
                href="/pricing"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Column 3: Legal Links */}
          <div className="flex flex-col items-center md:items-start justify-start space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Legal</h3>
            <div className="space-y-2 text-center md:text-left">
              <Link
                href="/privacy-policy"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Column 4: Community */}
          <div className="flex flex-col items-center md:items-start justify-start space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              {CONTENT?.community?.title || "Connect with Us"}
            </h3>

            <div className="flex justify-center md:justify-start gap-4">
              {(CONTENT?.community?.socialLinks || []).map((social: any, index: number) => {
                const IconComponent =
                  iconMap[social.icon as keyof typeof iconMap];
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all hover:scale-110"
                    title={social.name}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="pt-12">
          <div className="mx-auto h-0.5 w-full max-w-5xl bg-gradient-to-r from-blue-600/30 via-purple-600 to-blue-600/30"></div>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} StemXio LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}