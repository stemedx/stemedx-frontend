"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { getTranslations } from "@/locales";
import { getAllCourses } from "@/lib/services/api/courses";
import { Course } from "@/lib/types/courses";
import { Instructor } from "@/lib/types/instructors";
import { Subject } from "@/lib/types/api";

type CourseWithInstructor = Course & { instructor: Instructor; subject: Subject };

interface CoursesProps {
  isAuthenticated: boolean;
}

export default function Courses({ isAuthenticated }: CoursesProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const CONTENT = getTranslations('courses', language) as { header: { title: string; subtitle: string }; card: { browseButton: string } };
  const [displayCount, setDisplayCount] = useState(12);
  const [courses, setCourses] = useState<CourseWithInstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerLoad = 12;

  const handleBrowseCourse = (courseId: string) => {
    if (isAuthenticated) {
      router.push(`/courses/${courseId}`);
    } else {
      router.push(`/login?redirect=/courses/${courseId}`);
    }
  };

  // Load courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getAllCourses();
        setCourses(response.courses as any);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // API already returns frontend-ready data, no mapping needed
  const displayCourses = courses.length > 0 ? courses.map(course => ({
    id: course.id,
    title: (course as any).title || course.name,
    description: (course as any).description || course.summary,
    duration: course.duration,
    subject: (course as any).subject || course.subject?.name || "",
    subjectCode: (course as any).grade || course.subject?.code || "",
    language: (course as any).language || "",
    thumbnailUrl: (course as any).thumbnailUrl || course.thumbnail_url,
    totalModules: (course as any).totalModules || course.total_modules,
    tutorialSessions: (course as any).tutorialSessions || course.tutorial_sessions,
  })) : [];

  return (
    <div>
      <div className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pb-12 sm:pb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white pb-4">
              {CONTENT.header.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              {CONTENT.header.subtitle}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white mt-4">Loading courses...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-500/20 border border-red-400 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-200">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Display courses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {displayCourses.slice(0, displayCount).map((course) => (
                    <div
                      key={course.id}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 h-full flex flex-col"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full h-50">
                        {course.thumbnailUrl ? (
                          <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-900/60 to-blue-900/60 flex items-center justify-center">
                            <span className="text-4xl">📚</span>
                          </div>
                        )}
                        {/* Subject tag overlay */}
                        {course.subject && (
                          <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-purple-300 border border-purple-400/30 rounded-full text-xs font-medium">
                              {course.subject}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-white pb-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-4 flex-1">{course.description}</p>

                        {/* Stats row */}
                        <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <span>📦</span> {course.totalModules} Modules
                          </span>
                          <span className="flex items-center gap-1">
                            <span>🎓</span> {course.tutorialSessions} Tutorials
                          </span>
                          <span className="flex items-center gap-1">
                            <span>⏱️</span> {course.duration}
                          </span>
                        </div>

                        {/* Subject code & Language */}
                        <div className="flex items-center gap-2 mb-4">
                          {course.subjectCode && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded text-xs font-medium">
                              {course.subjectCode}
                            </span>
                          )}
                          {course.language && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded text-xs font-medium">
                              {course.language}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleBrowseCourse(course.id)}
                          className="w-full bg-primary-gradient text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 mt-auto cursor-pointer"
                        >
                          {CONTENT.card.browseButton}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              {/* Load More Button */}
              {displayCount < displayCourses.length && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setDisplayCount(prev => prev + itemsPerLoad)}
                    className="glass-strong text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl border-2 border-purple-500/30 hover:border-purple-500/50"
                  >
                    Load More Courses
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
