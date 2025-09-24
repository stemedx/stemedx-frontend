"use client";

import { useState, useEffect } from "react";
import { TutorialCard } from "../components/TutorialCard";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";

export default function Tutorials() {
  const CONTENT = getTranslations('tutorials', CURRENT_LANGUAGE) as {
    header: {
      title: string;
      subtitle: string;
    };
    filters: {
      subjects: {
        title: string;
        label: string;
        all: string;
      };
      grades: {
        title: string;
        label: string;
        all: string;
      };
      clearAll: string;
      clearAllShort: string;
    };
    results: {
      title: string;
      booksFound: string;
      bookFound: string;
      noBooks: {
        title: string;
        subtitle: string;
        button: string;
      };
    };
    delivery: {
      title: string;
      subtitle: string;
      features: {
        shipping: { icon: string; title: string; description: string };
        quality: { icon: string; title: string; description: string };
        tracking: { icon: string; title: string; description: string };
      };
    };
    tracking: {
      title: string;
      subtitle: string;
      placeholder: string;
      button: string;
      loading: string;
      statuses: {
        processing: string;
        shipped: string;
        transit: string;
        delivered: string;
        notFound: string;
      };
    };
  };
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [trackingId, setTrackingId] = useState("");
  const [trackingStatus, setTrackingStatus] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows of 4 cards each

  const tutorials = [
    {
      id: 1,
      topic: "Advanced Calculus Mastery",
      subtitle: "Complete guide to differential and integral calculus",
      thumbnail: "https://via.placeholder.com/200x250/6366f1/ffffff?text=Calculus",
      price: "$49",
      originalPrice: "$79",
      discount: "38% OFF",
      subject: "Mathematics",
      grade: "12",
      hasDiscount: true
    },
    {
      id: 2,
      topic: "Physics: Mechanics & Motion",
      subtitle: "Understanding forces, energy, and momentum",
      thumbnail: "https://via.placeholder.com/200x250/3b82f6/ffffff?text=Physics",
      price: "$45",
      subject: "Science",
      grade: "11",
      hasDiscount: false
    },
    {
      id: 3,
      topic: "Organic Chemistry Fundamentals",
      subtitle: "Essential concepts in organic chemistry",
      thumbnail: "https://via.placeholder.com/200x250/10b981/ffffff?text=Chemistry",
      price: "$35",
      originalPrice: "$55",
      discount: "36% OFF",
      subject: "Science",
      grade: "12",
      hasDiscount: true
    },
    {
      id: 4,
      topic: "Introduction to Programming",
      thumbnail: "https://via.placeholder.com/200x250/8b5cf6/ffffff?text=Programming",
      price: "$39",
      subject: "IT",
      grade: "9",
      hasDiscount: false
    },
    {
      id: 5,
      topic: "Biology: Cell Structure & Function",
      subtitle: "Comprehensive study of cellular biology",
      thumbnail: "https://via.placeholder.com/200x250/f59e0b/ffffff?text=Biology",
      price: "$42",
      subject: "Science",
      grade: "10",
      hasDiscount: false
    },
    {
      id: 6,
      topic: "Statistics & Data Analysis",
      subtitle: "Learn statistical methods and data interpretation",
      thumbnail: "https://via.placeholder.com/200x250/ec4899/ffffff?text=Statistics",
      price: "$38",
      originalPrice: "$48",
      discount: "21% OFF",
      subject: "Mathematics",
      grade: "11",
      hasDiscount: true
    },
    {
      id: 7,
      topic: "Environmental Science",
      subtitle: "Understanding ecosystems and environmental challenges",
      thumbnail: "https://via.placeholder.com/200x250/059669/ffffff?text=Environment",
      price: "$33",
      subject: "Science",
      grade: "10",
      hasDiscount: false
    },
    {
      id: 8,
      topic: "Engineering Principles",
      subtitle: "Foundation concepts in engineering design",
      thumbnail: "https://via.placeholder.com/200x250/dc2626/ffffff?text=Engineering",
      price: "$52",
      subject: "Science",
      grade: "12",
      hasDiscount: false
    },
    {
      id: 9,
      topic: "Algebra Fundamentals",
      subtitle: "Master linear equations and graphing",
      thumbnail: "https://via.placeholder.com/200x250/8b5cf6/ffffff?text=Algebra",
      price: "$38",
      originalPrice: "$48",
      discount: "21% OFF",
      subject: "Mathematics",
      grade: "9",
      hasDiscount: true
    },
    {
      id: 10,
      topic: "Python Programming",
      subtitle: "Learn Python from basics to advanced",
      thumbnail: "https://via.placeholder.com/200x250/10b981/ffffff?text=Python",
      price: "$45",
      subject: "IT",
      grade: "11",
      hasDiscount: false
    },
    {
      id: 11,
      topic: "Geometry & Trigonometry",
      subtitle: "Shapes, angles, and triangle relationships",
      thumbnail: "https://via.placeholder.com/200x250/f59e0b/ffffff?text=Geometry",
      price: "$42",
      originalPrice: "$55",
      discount: "24% OFF",
      subject: "Mathematics",
      grade: "10",
      hasDiscount: true
    },
    {
      id: 12,
      topic: "Web Development",
      subtitle: "HTML, CSS, and JavaScript essentials",
      thumbnail: "https://via.placeholder.com/200x250/3b82f6/ffffff?text=WebDev",
      price: "$50",
      subject: "IT",
      grade: "12",
      hasDiscount: false
    },
    {
      id: 13,
      topic: "Atomic Structure",
      subtitle: "Understanding atoms and periodic table",
      thumbnail: "https://via.placeholder.com/200x250/ec4899/ffffff?text=Atoms",
      price: "$36",
      subject: "Science",
      grade: "9",
      hasDiscount: false
    },
    {
      id: 14,
      topic: "Data Analysis",
      subtitle: "Statistics and data interpretation methods",
      thumbnail: "https://via.placeholder.com/200x250/059669/ffffff?text=Data",
      price: "$44",
      originalPrice: "$60",
      discount: "27% OFF",
      subject: "Mathematics",
      grade: "12",
      hasDiscount: true
    },
    {
      id: 15,
      topic: "Database Management",
      subtitle: "SQL and database design principles",
      thumbnail: "https://via.placeholder.com/200x250/dc2626/ffffff?text=Database",
      price: "$48",
      subject: "IT",
      grade: "11",
      hasDiscount: false
    },
    {
      id: 16,
      topic: "Genetics & Evolution",
      subtitle: "DNA, heredity, and natural selection",
      thumbnail: "https://via.placeholder.com/200x250/6366f1/ffffff?text=Genetics",
      price: "$41",
      subject: "Science",
      grade: "11",
      hasDiscount: false
    }
  ];

  const subjects = ["All", "Science", "Mathematics", "IT"];
  const grades = ["All", "9", "10", "11", "12"];

  // Filter tutorials based on selected criteria
  const filteredTutorials = tutorials.filter(tutorial => {
    const subjectMatch = selectedSubject === "All" || tutorial.subject === selectedSubject;
    const gradeMatch = selectedGrade === "All" || tutorial.grade === selectedGrade;
    return subjectMatch && gradeMatch;
  });

  // Reset to first page when filters change
  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredTutorials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTutorials = filteredTutorials.slice(startIndex, endIndex);

  // Reset page when filters change
  useEffect(() => {
    resetToFirstPage();
  }, [selectedSubject, selectedGrade]);

  const handleTracking = () => {
    if (!trackingId.trim()) return;
    
    setIsTracking(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock tracking logic
      const trackingData = {
        'TB123456789': 'delivered',
        'TB123456788': 'transit',
        'TB123456787': 'shipped',
        'TB123456786': 'processing'
      };
      
      const status = trackingData[trackingId] || 'notFound';
      setTrackingStatus(status);
      setIsTracking(false);
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Hero Section with Integrated Filters */}
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {/* Hero Header */}
          <div className="text-center m-10">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {CONTENT.header.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {CONTENT.header.subtitle}
            </p>
          </div>

          {/* Main Layout with Left Sidebar */}
          <div className="flex gap-8 lg:gap-12">
            {/* Left Sidebar - All Filters */}
            <div className="w-80 flex-shrink-0 space-y-6">
              {/* Subject Filters */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-xl">⚗️</span>
                  Choose Your Subject
                </h3>
                <div className="space-y-3">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                        selectedSubject === subject
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : 'bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 hover:text-white hover:border-white/40'
                      }`}
                    >
                      <span className="text-xl">
                        {subject === "All" ? "🎯" : 
                         subject === "Mathematics" ? "🔢" :
                         subject === "Science" ? "⚗️" :
                         subject === "IT" ? "💻" : "📖"}
                      </span>
                      <span className="font-medium">
                        {subject === "All" ? CONTENT.filters.subjects.all : subject}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grade Filters */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-xl">🎓</span>
                  Select Grade Level
                </h3>
                <div className="space-y-2">
                  {grades.map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                        selectedGrade === grade
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                          : 'bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 hover:text-white hover:border-white/40'
                      }`}
                    >
                      <span className="text-base font-medium">
                        {grade === "All" ? "🎯 All Grades" : `📖 Grade ${grade}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Stats & Clear Filters */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">📚</span>
                    <span className="text-lg font-bold text-white">
                      {filteredTutorials.length} {filteredTutorials.length !== 1 ? CONTENT.results.booksFound : CONTENT.results.bookFound}
                    </span>
                  </div>
                  
                  {(selectedSubject !== "All" || selectedGrade !== "All") && (
                    <button
                      onClick={() => {
                        setSelectedSubject("All");
                        setSelectedGrade("All");
                      }}
                      className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 hover:text-orange-100 font-medium px-4 py-2 rounded-lg transition-all duration-300 border border-orange-400/30"
                    >
                      {CONTENT.filters.clearAll}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Tutorial Cards Grid */}
              {currentTutorials.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentTutorials.map((tutorial, index) => (
                      <div
                        key={tutorial.id}
                        className="group transform hover:scale-105 transition-all duration-500 opacity-0 animate-fadeInUp"
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: 'forwards'
                        }}
                      >
                        <TutorialCard
                          id={tutorial.id}
                          topic={tutorial.topic}
                          subtitle={tutorial.subtitle}
                          thumbnail={tutorial.thumbnail}
                          price={tutorial.price}
                          originalPrice={tutorial.originalPrice}
                          discount={tutorial.discount}
                          subject={tutorial.subject}
                          grade={tutorial.grade}
                          hasDiscount={tutorial.hasDiscount}
                          onClick={() => window.location.href = '/login'}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                      {/* Previous Button */}
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          currentPage === 1
                            ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                            : 'bg-white/10 hover:bg-white/20 text-white hover:scale-105'
                        }`}
                      >
                        ← Previous
                      </button>

                      {/* Page Numbers */}
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                                : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white hover:scale-105'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          currentPage === totalPages
                            ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                            : 'bg-white/10 hover:bg-white/20 text-white hover:scale-105'
                        }`}
                      >
                        Next →
                      </button>
                    </div>
                  )}

                  {/* Page Info */}
                  {totalPages > 1 && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-400">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredTutorials.length)} of {filteredTutorials.length} results
                        {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="text-8xl mb-8 animate-bounce">📚</div>
                  <h3 className="text-3xl font-semibold text-white mb-4">{CONTENT.results.noBooks.title}</h3>
                  <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
                    {CONTENT.results.noBooks.subtitle}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSubject("All");
                      setSelectedGrade("All");
                    }}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
                  >
                    {CONTENT.results.noBooks.button}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-separator"></div>

      {/* Tracking Section */}
      <div className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white pb-4">
                {CONTENT.tracking.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-300">
                {CONTENT.tracking.subtitle}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder={CONTENT.tracking.placeholder}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-md"
                    onKeyDown={(e) => e.key === 'Enter' && handleTracking()}
                  />
                </div>

                <button
                  onClick={handleTracking}
                  disabled={!trackingId.trim() || isTracking}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isTracking ? CONTENT.tracking.loading : CONTENT.tracking.button}
                </button>

                {trackingStatus && (
                  <div className={`p-4 rounded-xl text-center font-medium ${
                    trackingStatus === 'delivered' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                    trackingStatus === 'transit' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                    trackingStatus === 'shipped' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                    trackingStatus === 'processing' ? 'bg-orange-500/20 text-orange-300 border border-orange-400/30' :
                    'bg-red-500/20 text-red-300 border border-red-400/30'
                  }`}>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">
                        {trackingStatus === 'delivered' ? '✅' :
                         trackingStatus === 'transit' ? '🚛' :
                         trackingStatus === 'shipped' ? '📦' :
                         trackingStatus === 'processing' ? '⏳' : '❌'}
                      </span>
                      <span className="text-lg">
                        {CONTENT.tracking.statuses[trackingStatus as keyof typeof CONTENT.tracking.statuses]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Demo tracking IDs */}
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Demo tracking IDs:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['TB123456789', 'TB123456788', 'TB123456787', 'TB123456786'].map((id) => (
                      <button
                        key={id}
                        onClick={() => setTrackingId(id)}
                        className="text-xs bg-white/10 hover:bg-white/20 text-gray-300 px-2 py-1 rounded border border-white/20 transition-all duration-200"
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-separator"></div>

      <div className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white pb-4">
              {CONTENT.delivery.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {CONTENT.delivery.subtitle}
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-2">{CONTENT.delivery.features.shipping.icon}</div>
                <h3 className="font-semibold text-white mb-1">{CONTENT.delivery.features.shipping.title}</h3>
                <p className="text-gray-300 text-sm">{CONTENT.delivery.features.shipping.description}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">{CONTENT.delivery.features.quality.icon}</div>
                <h3 className="font-semibold text-white mb-1">{CONTENT.delivery.features.quality.title}</h3>
                <p className="text-gray-300 text-sm">{CONTENT.delivery.features.quality.description}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">{CONTENT.delivery.features.tracking.icon}</div>
                <h3 className="font-semibold text-white mb-1">{CONTENT.delivery.features.tracking.title}</h3>
                <p className="text-gray-300 text-sm">{CONTENT.delivery.features.tracking.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}