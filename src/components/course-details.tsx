"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Course, CourseModule } from "@/lib/types/courses";
import { purchasesApi } from "@/lib/services/api/purchases";
import { createClient } from "@/lib/services/auth/client";

interface CourseDetailClientProps {
  course: Course;
  modules: CourseModule[];
}

export default function CourseOverview({ course, modules }: CourseDetailClientProps) {
  const router = useRouter();
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  // const [isProcessing, setIsProcessing] = useState(false); // Needed for checkout flow

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

  // Handle Continue Learning - navigate to learn page
  const handleContinueLearning = () => {
    router.push(`/courses/${course.id}/learn`);
  };

  // CHECKOUT FLOW - Commented out for now, uncomment to enable payment flow
  // const handleContinueLearning = async () => {
  //   try {
  //     setIsProcessing(true);
  //
  //     // Get current user
  //     const supabase = createClient();
  //     const { data: { user }, error: authError } = await supabase.auth.getUser();
  //
  //     if (authError || !user) {
  //       alert('Please log in to continue');
  //       router.push('/login');
  //       return;
  //     }
  //
  //     // Create order
  //     const { checkout_url } = await purchasesApi.createOrder({
  //       student_id: user.id,
  //       product_id: course.product_id,
  //     });
  //
  //     // Redirect to Stripe hosted checkout
  //     router.push(checkout_url);
  //   } catch (error) {
  //     console.error('Error creating order:', error);
  //     alert('Failed to process payment. Please try again.');
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <div className="py-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Course Info Card - Top */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🔬</span>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                {course.subject?.name || "Subject"}
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                {course.subject?.code || "N/A"}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {course.name}
          </h1>

          <div className="mb-6">
            <p className="text-base text-gray-300 leading-relaxed">
              {showFullOverview
                ? course.description
                : course.description.length > 200
                ? `${course.description.substring(0, 200)}...`
                : course.description}
            </p>
            {course.description.length > 200 && (
              <button
                onClick={() => setShowFullOverview(!showFullOverview)}
                className="text-purple-400 hover:text-purple-300 text-sm font-semibold mt-2 transition-colors"
              >
                {showFullOverview ? "See less" : "See more"}
              </button>
            )}
          </div>

          {/* Course Stats */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 rounded-full flex items-center gap-2">
              <span className="text-xl">👥</span>
              <span className="font-semibold text-white">{enrolledStudents}</span>
              <span className="text-gray-300 text-sm">students</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 rounded-full flex items-center gap-2">
              <span className="text-xl">📚</span>
              <span className="font-semibold text-white">{sortedModules.length}</span>
              <span className="text-gray-300 text-sm">Modules</span>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <p className="text-xs text-gray-400 mb-1">Course Price</p>
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Rs. {parseFloat(course.price).toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleContinueLearning}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-8 rounded-xl font-bold text-base hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/50"
            >
              Continue Learning
            </button>
          </div>

          {/* Instructor */}
          <div>
            <p className="text-xs text-gray-400 mb-3">Instructor</p>
            <div className="flex items-center gap-3">
              {course.instructor?.profile_image_url ? (
                <img
                  src={course.instructor.profile_image_url}
                  alt={`${course.instructor.first_name} ${course.instructor.last_name}`}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {course.instructor
                    ? `${course.instructor.first_name[0]}${course.instructor.last_name[0]}`
                    : "IN"}
                </div>
              )}
              <div>
                <p className="text-base font-semibold text-white">
                  {course.instructor
                    ? `${course.instructor.first_name} ${course.instructor.last_name}`
                    : "Instructor Name"}
                </p>
                <p className="text-sm text-gray-400">Lead Instructor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Card - Bottom */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Course Content</h3>
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
                    {module.CourseModuleVideos.length} videos • {module.duration} min
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
                              Video {lessonId}
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
  );
}
