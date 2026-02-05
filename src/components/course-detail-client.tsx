"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Course, CourseModule } from "@/lib/types/courses";

interface CourseDetailClientProps {
  course: Course;
  modules: CourseModule[];
}

export default function CourseOverview({ course, modules }: CourseDetailClientProps) {
  const router = useRouter();
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  // Toggle section expansion
  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  // Sort modules by order
  const sortedModules = modules.sort((a, b) => a.order - b.order);

  // Calculate total lessons
  const totalLessons = modules.reduce(
    (total, module) => total + module.CourseModuleVideos.length,
    0
  );

  // Calculate total enrolled students
  const enrolledStudents = modules.reduce(
    (total, module) => total + module.enrolled_count,
    0
  );

  // Create a mapping of video to lesson ID (consistent with learn page)
  // This replicates the exact same logic as transformCourseData in learn page
  const getVideoLessonId = (moduleIndex: number, videoIndex: number): number => {
    let lessonId = 1;
    // Add all lessons from previous modules
    for (let i = 0; i < moduleIndex; i++) {
      lessonId += sortedModules[i].CourseModuleVideos.length;
    }
    // Add current video index (0-based, so first video = 0)
    lessonId += videoIndex;
    return lessonId;
  };

  // Navigate to lesson player with specific lesson
  const navigateToLesson = (lessonId: number) => {
    router.push(`/courses/${course.id}/learn?lesson=${lessonId}`);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 pt-24 pb-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Course Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">🔬</span>
                <div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                    {course.subject?.name || "Subject"}
                  </span>
                  <span className="ml-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                    {course.subject?.code || "N/A"}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                {course.name}
              </h1>

              <div className="mb-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {showFullOverview
                    ? course.description
                    : course.description.length > 150
                    ? `${course.description.substring(0, 150)}...`
                    : course.description}
                </p>
                {course.description.length > 150 && (
                  <button
                    onClick={() => setShowFullOverview(!showFullOverview)}
                    className="text-purple-400 hover:text-purple-300 text-xs font-semibold mt-1 transition-colors"
                  >
                    {showFullOverview ? "See less" : "See more"}
                  </button>
                )}
              </div>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 rounded-full flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <span className="font-semibold text-white">{enrolledStudents}</span>
                  <span className="text-gray-300 text-sm">students</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 rounded-full flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  <span className="font-semibold text-white">{totalLessons}</span>
                  <span className="text-gray-300 text-sm">Lessons</span>
                </div>
                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full flex items-center gap-2">
                  <span className="text-xl">⏱️</span>
                  <span className="text-gray-300 text-sm">{course.duration} weeks</span>
                </div>
              </div>

              {/* Pricing - No box */}
              <div className="mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Course Price</p>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Rs. {parseFloat(course.price).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => router.push(`/courses/${course.id}/learn`)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-xl font-bold text-sm hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/50"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-2">Instructor</p>
                <div className="flex items-center gap-3">
                  {course.instructor?.profile_image_url ? (
                    <img
                      src={course.instructor.profile_image_url}
                      alt={`${course.instructor.first_name} ${course.instructor.last_name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {course.instructor
                        ? `${course.instructor.first_name[0]}${course.instructor.last_name[0]}`
                        : "IN"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {course.instructor
                        ? `${course.instructor.first_name} ${course.instructor.last_name}`
                        : "Instructor Name"}
                    </p>
                    <p className="text-xs text-gray-400">Lead Instructor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Course Content Focus */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Course Content</h3>
              <div className="space-y-3">
                {sortedModules.map((module, moduleIndex) => (
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
                      <div className="text-xs text-gray-400">
                        {module.CourseModuleVideos.length} lessons • {module.duration} min
                      </div>
                    </button>

                    {/* Expanded Video List */}
                    {expandedSections.has(moduleIndex) && (
                      <div className="border-t border-white/10">
                        {module.CourseModuleVideos
                          .sort((a, b) => a.order - b.order)
                          .map((video, videoIndex) => {
                            const lessonId = getVideoLessonId(moduleIndex, videoIndex);
                            return (
                              <button
                                key={video.id}
                                onClick={() => navigateToLesson(lessonId)}
                                className="w-full px-8 py-3 hover:bg-white/10 transition-colors flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-purple-400">▶️</span>
                                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors text-left">
                                    {video.title}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  Lesson {lessonId}
                                </span>
                              </button>
                            );
                          })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}