"use client";

import { useState } from "react";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Get translations for this page
const CONTENT = getTranslations('reachus', CURRENT_LANGUAGE);

// Icon mapping with react-icons
const iconMap = {
  Facebook: FaFacebook,
  X: FaXTwitter,
  MessageCircle: FaWhatsapp,
  Send: FaTelegram
};

export default function ReachUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-page-gradient">
      {/* Header */}
      <div className="bg-primary-gradient py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{CONTENT.header.title}</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            {CONTENT.header.subtitle}
          </p>
        </div>
      </div>


      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-1 gap-16 justify-center">
            <div className="space-y-8 max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">{CONTENT.contactInfo.title}</h2>
                
                <div className="space-y-6">
                  {CONTENT.contactInfo.methods.map((method, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary-gradient rounded-full flex items-center justify-center">
                        <span className="text-2xl">{method.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{method.title}</h3>
                        <p className="text-gray-600 whitespace-pre-line">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{CONTENT.community.title}</h3>
                <p className="text-gray-600 mb-6">{CONTENT.community.description}</p>
                <div className="flex justify-center gap-4">
                  {CONTENT.community.socialLinks.map((social, index) => {
                    const IconComponent = iconMap[social.icon as keyof typeof iconMap];
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-secondary-gradient rounded-lg flex items-center justify-center cursor-pointer hover-primary-gradient transition-all hover:scale-110"
                        title={social.name}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}