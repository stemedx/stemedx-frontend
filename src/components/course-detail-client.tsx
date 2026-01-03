"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Mock course data (in a real app, this would come from an API)
const getCourseData = (id: string) => {
  const courses = [
    {
      id: id, // Use the actual UUID from the URL
      title: "Advanced Physics Online",
      description: "Master quantum mechanics through interactive simulations and virtual labs",
      duration: "12 weeks",
      image: "🔬",
      subject: "Physics",
      grade: "12",
      instructor: "Dr. Sarah Johnson",
      instructorImage: "/api/placeholder/100/100",
      enrolledStudents: 1250,
      totalLessons: 45,
      totalProjects: 2,
      price: "$299",
      hasDiscount: true,
      overview: "In this comprehensive physics course, you'll explore the fascinating world of quantum mechanics through interactive simulations and virtual laboratory experiments. Learn from industry experts and gain hands-on experience with cutting-edge concepts.",
      courseContent: [
        {
          section: "Introduction to Quantum Physics",
          lessons: 8,
          duration: "2 hours"
        },
        {
          section: "Wave Functions and Probability",
          lessons: 12,
          duration: "3 hours"
        },
        {
          section: "Quantum Operators and Measurements",
          lessons: 10,
          duration: "2.5 hours"
        },
        {
          section: "Virtual Lab Experiments",
          lessons: 15,
          duration: "4 hours"
        }
      ]
    }
  ];
  
  // Return the first course (since we only have mock data for one course)
  return courses[0];
};

export default function CourseOverview() {
  const params = useParams();
  const router = useRouter();
  const [showFullOverview, setShowFullOverview] = useState(false);

  const courseId = params.id as string;
  const course = getCourseData(courseId);
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Course Not Found</h1>
          <button
            onClick={() => router.push("/courses")}
            className="bg-primary-gradient text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 pt-24 pb-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Course Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{course.image}</span>
                <div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                    {course.subject}
                  </span>
                  <span className="ml-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                    Grade {course.grade}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                {course.title}
              </h1>

              <div className="mb-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {showFullOverview
                    ? course.overview
                    : `${course.overview.substring(0, 150)}...`
                  }
                </p>
                <button
                  onClick={() => setShowFullOverview(!showFullOverview)}
                  className="text-purple-400 hover:text-purple-300 text-xs font-semibold mt-1 transition-colors"
                >
                  {showFullOverview ? "See less" : "See more"}
                </button>
              </div>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 rounded-full flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <span className="font-semibold text-white">{course.enrolledStudents}</span>
                  <span className="text-gray-300 text-sm">students</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 rounded-full flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  <span className="font-semibold text-white">{course.totalLessons}</span>
                  <span className="text-gray-300 text-sm">Lessons</span>
                </div>
                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full flex items-center gap-2">
                  <span className="text-xl">🏆</span>
                  <span className="text-gray-300 text-sm">{course.totalProjects} Projects</span>
                </div>
              </div>

              {/* Pricing - No box */}
              <div className="mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Course Price</p>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{course.price}</span>
                  </div>
                  <button
                    onClick={() => router.push(`/courses/${courseId}/learn`)}
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
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{course.instructor}</p>
                    <p className="text-xs text-gray-400">Lead Physics Instructor</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Course Content Focus */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Course Content</h3>
              <div className="space-y-3">
                {course.courseContent.map((section, index) => (
                  <div key={index} className="border border-white/10 rounded-xl p-5 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center">
                      <h4 className="text-base font-semibold text-white">{section.section}</h4>
                      <div className="text-xs text-gray-400">
                        {section.lessons} lessons • {section.duration}
                      </div>
                    </div>
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