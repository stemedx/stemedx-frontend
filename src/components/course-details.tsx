"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { getTranslations } from "@/locales";
import { CourseDetailsResponse } from "@/lib/types/courses";
import { purchasesApi } from "@/lib/services/api/purchases";
import { createClient } from "@/lib/services/auth/client";

interface CourseDetailClientProps {
  course: CourseDetailsResponse;
}

export default function CourseOverview({ course }: CourseDetailClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const CONTENT = getTranslations('courses', language) as { instructor: { label: string } };
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentOption, setPaymentOption] = useState<'module' | 'platform' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | null>(null);
  const [paymentId, setPaymentId] = useState('');
  const [copiedPaymentId, setCopiedPaymentId] = useState(false);
  const [isFetchingRef, setIsFetchingRef] = useState(false);

  const resetModalState = () => {
    setShowPurchaseModal(false);
    setSelectedProductId(null);
    setIsProcessing(false);
    setPaymentOption(null);
    setPaymentMethod(null);
    setPaymentId('');
    setCopiedPaymentId(false);
    setIsFetchingRef(false);
  };

  const openPurchaseModal = (productId: string) => {
    setSelectedProductId(productId);
    setPaymentOption(null);
    setPaymentMethod(null);
    setPaymentId('');
    setCopiedPaymentId(false);
    setIsFetchingRef(false);
    setShowPurchaseModal(true);
  };

  const fetchBankPaymentRef = async (transferType: 'one-time' | 'subscription') => {
    if (!selectedProductId || isFetchingRef) return;
    setIsFetchingRef(true);
    try {
      const { payment_reference } = await purchasesApi.createBankPaymentOrder({
        product_id: selectedProductId,
        transfer_type: transferType,
      });
      setPaymentId(payment_reference);
    } catch (error) {
      console.error('Failed to generate payment reference:', error);
      setIsFetchingRef(false);
    }
  };

  const togglePaymentOption = (option: 'module' | 'platform') => {
    if (paymentOption === option) {
      setPaymentOption(null);
      setPaymentMethod(null);
    } else {
      setPaymentOption(option);
      setPaymentMethod(null);
    }
  };

  const handleCardPayment = async () => {
    if (!selectedProductId || isProcessing) return;
    setIsProcessing(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const { checkout_url } = await purchasesApi.createOrder({
        student_id: user.id,
        product_id: selectedProductId,
      });
      router.push(checkout_url);
    } catch (error) {
      console.error('Failed to create order:', error);
      setIsProcessing(false);
    }
  };

  const copyPaymentId = async () => {
    await navigator.clipboard.writeText(paymentId);
    setCopiedPaymentId(true);
    setTimeout(() => setCopiedPaymentId(false), 2000);
  };

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const navigateToModule = (moduleId: string) => {
    router.push(`/courses/${course.id}/learn?module=${moduleId}`);
  };

  const { instructor } = course;

  const ensureUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

  const markdownToHtml = (md: string) =>
    md
      .replace(/^### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      .replace(/^# (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .replace(/^(.*)$/, '<p>$1</p>');

  return (
    <div className="py-24 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Row - Course Info & Instructor (equal height) */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8">
          {/* Course Info Card */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                  {course.subject.name}
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                  {course.subject.grade}
                </span>
                {course.language && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">
                    {course.language}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {course.name}
            </h1>

            <div className="mb-6 flex-1">
              <p className="text-base text-gray-300 leading-relaxed">
                {showFullOverview
                  ? course.description
                  : course.description.length > 500
                  ? `${course.description.substring(0, 500)}...`
                  : course.description}
              </p>
              {course.description.length > 500 && (
                <button
                  onClick={() => setShowFullOverview(!showFullOverview)}
                  className="text-purple-400 hover:text-purple-300 text-sm font-semibold mt-2 transition-colors"
                >
                  {showFullOverview ? "See less" : "See more"}
                </button>
              )}
            </div>

            {/* Course Stats */}
            <div className="flex flex-wrap gap-3 mt-auto">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 rounded-full flex items-center gap-2">
                <span className="text-xl">📚</span>
                <span className="font-semibold text-white">{course.totalModules}</span>
                <span className="text-gray-300 text-sm">Modules</span>
              </div>
            </div>
          </div>

          {/* Instructor Card */}
          <div className="lg:w-[360px] lg:shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-5">
              {instructor.profileImageUrl ? (
                <img
                  src={instructor.profileImageUrl}
                  alt={`${instructor.firstName} ${instructor.lastName}`}
                  className="w-16 h-16 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {`${instructor.firstName[0]}${instructor.lastName[0]}`}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-white">
                  {`${instructor.firstName} ${instructor.lastName}`}
                </h3>
                <p className="text-sm text-purple-300">{CONTENT.instructor.label}</p>
              </div>
            </div>

            {/* Social Links */}
            {instructor.socialLinks && (
              <div className="flex items-center gap-2 mb-5">
                {instructor.socialLinks.email && (
                  <a
                    href={instructor.socialLinks.email}
                    className="w-9 h-9 bg-white/10 hover:bg-purple-500/30 border border-white/10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                )}
                {instructor.socialLinks.linkedin && (
                  <a
                    href={ensureUrl(instructor.socialLinks.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-blue-500/30 border border-white/10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {instructor.socialLinks.x && (
                  <a
                    href={ensureUrl(instructor.socialLinks.x)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {instructor.socialLinks.whatsapp && (
                  <a
                    href={ensureUrl(instructor.socialLinks.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-green-500/30 border border-white/10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Bio */}
            {(language === 'si' ? instructor.bio_sinhala : instructor.bioHtml) && (
              <div className="pt-5 border-t border-white/10 flex-1 overflow-y-auto">
                <div
                  className="text-sm text-gray-300 leading-relaxed max-w-none [&_h3]:text-white [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:border-b [&_h3]:border-purple-500/40 [&_h3]:pb-1 [&_h3]:mb-2 [&_h3]:mt-4 [&_h4]:text-white [&_h4]:text-sm [&_h4]:font-semibold [&_h4]:border-b [&_h4]:border-purple-500/40 [&_h4]:pb-1 [&_h4]:mb-2 [&_h4]:mt-4 [&_strong]:text-white [&_a]:text-purple-400 [&_ul]:my-2 [&_ul]:pl-4 [&_ul]:list-disc [&_li]:my-1 [&_li]:font-normal [&_p]:my-2"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml((language === 'si' ? instructor.bio_sinhala : instructor.bioHtml)!) }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Course Content Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Course Content</h3>
          <div className="space-y-3">
            {course.modules.map((module, moduleIndex) => (
              <div
                key={module.id}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleSection(moduleIndex)}
                  className="w-full p-5 hover:bg-white/5 transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white text-lg">
                      {expandedSections.has(moduleIndex) ? "▼" : "▶"}
                    </span>
                    <h4 className="text-base font-semibold text-white text-left">
                      {module.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {module.videoCount} videos • {module.duration} min
                    </span>
                    {module.isPurchased ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedSections.has(moduleIndex) && (
                  <div className="border-t border-white/10">
                    {module.videos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => module.isPurchased && navigateToModule(module.id)}
                        className={`w-full px-8 py-3 transition-colors flex items-center justify-between group ${
                          module.isPurchased ? 'hover:bg-white/10 cursor-pointer' : 'opacity-60 cursor-default'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-purple-400">▶️</span>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors text-left">
                            {video.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          Video {video.lessonId}
                        </span>
                      </button>
                    ))}

                    {/* Action Button */}
                    <div className="p-4 border-t border-white/10 flex justify-end">
                      {module.isPurchased ? (
                        <button
                          onClick={() => navigateToModule(module.id)}
                          className="glow-on-hover !border-white/30 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                        >
                          Start Learning
                        </button>
                      ) : (
                        <button
                          onClick={() => openPurchaseModal(module.productId)}
                          className="glow-on-hover !border-white/30 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                        >
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={resetModalState}
          />
          <div className="relative bg-gray-900 border border-white/20 rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Get Access</h3>
                <p className="text-sm text-gray-400 mt-1">Choose how you want to access this content</p>
              </div>
              <button
                onClick={resetModalState}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Option 1: Buy This Module */}
              <div className={`border rounded-xl overflow-hidden transition-colors ${paymentOption === 'module' ? 'border-purple-500/50 bg-white/5' : 'border-white/15'}`}>
                <button
                  onClick={() => togglePaymentOption('module')}
                  className="w-full px-5 py-4 text-left flex items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">Buy This Module</p>
                    <p className="text-sm text-gray-400">One-time purchase for this module only</p>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${paymentOption === 'module' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {paymentOption === 'module' && (
                  <div className="px-5 pb-4 space-y-3">
                    {/* Card sub-option */}
                    <div className={`border rounded-lg overflow-hidden transition-colors ${paymentMethod === 'card' ? 'border-blue-500/40 bg-blue-500/5' : 'border-white/10'}`}>
                      <button
                        onClick={() => setPaymentMethod(paymentMethod === 'card' ? null : 'card')}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">Card Payment</p>
                          <p className="text-xs text-gray-500">Credit or debit card</p>
                        </div>
                        <svg className={`w-4 h-4 text-gray-500 transition-transform ${paymentMethod === 'card' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {paymentMethod === 'card' && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-gray-400 mb-3">You will be redirected to our secure payment gateway.</p>
                          <button
                            onClick={handleCardPayment}
                            disabled={isProcessing}
                            className="w-full bg-primary-gradient border border-purple-500/30 rounded-lg py-3 text-center font-semibold text-white text-sm transition-all duration-200 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bank Transfer sub-option */}
                    <div className={`border rounded-lg overflow-hidden transition-colors ${paymentMethod === 'bank' ? 'border-green-500/40 bg-green-500/5' : 'border-white/10'}`}>
                      <button
                        onClick={() => setPaymentMethod(paymentMethod === 'bank' ? null : 'bank')}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">Bank Transfer</p>
                          <p className="text-xs text-gray-500">Direct bank transfer</p>
                        </div>
                        <svg className={`w-4 h-4 text-gray-500 transition-transform ${paymentMethod === 'bank' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {paymentMethod === 'bank' && (
                        <div className="px-4 pb-4 space-y-3">
                          {!paymentId ? (
                            <button
                              onClick={() => fetchBankPaymentRef('one-time')}
                              disabled={isFetchingRef}
                              className="w-full bg-primary-gradient border border-purple-500/30 rounded-lg py-3 text-center font-semibold text-white text-sm transition-all duration-200 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isFetchingRef ? 'Generating...' : 'Generate Payment Reference'}
                            </button>
                          ) : (
                            <>
                              {/* Payment Reference */}
                              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                <p className="text-xs text-purple-300 font-medium mb-2">Your Payment Reference</p>
                                <div className="flex items-center gap-3">
                                  <span className="text-xl font-bold text-white tracking-wider flex-1">{paymentId}</span>
                                  <button
                                    onClick={copyPaymentId}
                                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs text-white transition-colors flex items-center gap-1.5"
                                  >
                                    {copiedPaymentId ? (
                                      <>
                                        <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Copied
                                      </>
                                    ) : (
                                      <>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy
                                      </>
                                    )}
                                  </button>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Include this as the remark/reference in your pay-in slip</p>
                              </div>

                              {/* Bank Details */}
                              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <p className="text-sm text-white font-semibold mb-2">Bank Details</p>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Bank</span>
                                    <span className="text-white">Bank of Ceylon</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Account No.</span>
                                    <span className="text-white">0000 1234 5678</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Holder</span>
                                    <span className="text-white">StemEdX (Pvt) Ltd</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Branch</span>
                                    <span className="text-white">Colombo Main Branch</span>
                                  </div>
                                </div>
                              </div>

                              {/* QR Codes */}
                              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <p className="text-sm text-white font-semibold mb-1">Upload Your Pay-in Slip</p>
                                <p className="text-xs text-gray-400 mb-3">Scan to join and upload your slip for verification</p>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex flex-col items-center gap-2">
                                    <div className="bg-white rounded-lg p-2">
                                      <img src="/qr-whatsapp.png" alt="WhatsApp Group QR" className="w-24 h-24 object-contain" />
                                    </div>
                                    <span className="text-xs text-green-400 font-medium">WhatsApp</span>
                                  </div>
                                  <div className="flex flex-col items-center gap-2">
                                    <div className="bg-white rounded-lg p-2">
                                      <img src="/qr-telegram.png" alt="Telegram Group QR" className="w-24 h-24 object-contain" />
                                    </div>
                                    <span className="text-xs text-blue-400 font-medium">Telegram</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
