"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { getTranslations } from "@/locales";

interface ReachUsContent {
  header: {
    title: string;
    subtitle: string;
    subtitleBefore: string;
    subtitleLinkText: string;
    subtitleAfter: string;
  };
  contactInfo: {
    whatsapp: {
      title: string;
      description: string;
      qrImageAlt: string;
      link: string;
      linkLabel: string;
    };
  };
}

export function ReachUsClient() {
  const { language } = useLanguage();
  const content = getTranslations('reachus', language) as ReachUsContent;

  return (
    <div className="pt-4 pb-10">
      <div className="mb-10">
        <div className="max-w-7xl mx-auto text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{content.header.title}</h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90">
            {content.header.subtitle}
            <br />
            {content.header.subtitleBefore}{" "}
            <Link href="/courses" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">
              {content.header.subtitleLinkText}
            </Link>{" "}
            {content.header.subtitleAfter}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-md px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8 sm:p-12 flex flex-col items-center text-center">
          <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">
            {content.contactInfo.whatsapp.title}
          </h3>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
            {content.contactInfo.whatsapp.description}
          </p>
          <div className="bg-white rounded-xl p-3 mb-6">
            <Image
              src="https://kotdwxxjxtrauhwnukmz.supabase.co/storage/v1/object/public/assets/whatsapp-qr.jpeg"
              alt={content.contactInfo.whatsapp.qrImageAlt}
              width={591}
              height={1280}
              className="rounded-lg w-40 sm:w-48 h-auto"
            />
          </div>
          <a
            href={content.contactInfo.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-gradient text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
          >
            {content.contactInfo.whatsapp.linkLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
