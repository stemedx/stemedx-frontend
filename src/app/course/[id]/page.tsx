"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Mock course data (in a real app, this would come from an API)
const getCourseData = (id: string) => {
  const courses = [
    {
      id: 1,
      title: "Advanced Physics Online",
      description: "Master quantum mechanics through interactive simulations and virtual labs",
      duration: "12 weeks",
      level: "Advanced",
      image: "🔬",
      subject: "Physics",
      grade: "12",
      instructor: "Dr. Sarah Johnson",
      instructorImage: "/api/placeholder/100/100",
      enrolledStudents: 1250,
      rating: 4.8,
      totalLessons: 45,
      totalProjects: 2,
      estimatedHours: 10,
      price: "$299",
      originalPrice: "$399",
      discount: "25% OFF",
      hasDiscount: true,
      overview: "In this comprehensive physics course, you'll explore the fascinating world of quantum mechanics through interactive simulations and virtual laboratory experiments. Learn from industry experts and gain hands-on experience with cutting-edge concepts.",
      whatYouLearn: [
        "Quantum mechanics principles and applications",
        "Wave-particle duality and quantum states",
        "Virtual laboratory techniques",
        "Mathematical modeling of quantum systems",
        "Real-world applications in technology"
      ],
      prerequisites: [
        "Basic calculus and linear algebra",
        "High school physics knowledge",
        "Familiarity with computer simulations"
      ],
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
  
  return courses.find(course => course.id === parseInt(id));
};

export default function CourseOverview() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Course Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-6xl">{course.image}</span>
                <div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                    {course.subject}
                  </span>
                  <span className="ml-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                    Grade {course.grade}
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-xl">⭐</span>
                  <span className="font-semibold">{course.rating}</span>
                  <span>({course.enrolledStudents} students)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-xl">🕒</span>
                  <span>{course.estimatedHours} Hours</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-xl">📚</span>
                  <span>{course.totalLessons} Lessons</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-xl">🏆</span>
                  <span>{course.totalProjects} Projects</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {course.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Instructor</p>
                  <p className="text-lg font-semibold text-white">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:justify-self-end w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {course.hasDiscount ? (
                      <>
                        <span className="text-2xl line-through text-gray-400">{course.originalPrice}</span>
                        <span className="text-4xl font-bold text-green-400">{course.price}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-white">{course.price}</span>
                    )}
                  </div>
                  {course.hasDiscount && (
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {course.discount}
                    </span>
                  )}
                </div>

                {/* Enroll Button */}
                <button
                  onClick={() => router.push(`/course/${courseId}/learn`)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 mb-4"
                >
                  Continue Learning
                </button>

                {/* Course Features */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Certificate of Completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Mobile & Desktop Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Interactive Assignments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-separator"></div>

      {/* Course Details */}
      <div className="py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {["overview", "content", "instructor"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "overview" && (
              <div className="space-y-12">
                {/* What You'll Learn */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">What You'll Learn</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Prerequisites</h3>
                  <div className="space-y-3">
                    {course.prerequisites.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Overview */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Course Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {course.overview}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8">Course Content</h3>
                <div className="space-y-4">
                  {course.courseContent.map((section, index) => (
                    <div key={index} className="border border-white/10 rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold text-white">{section.section}</h4>
                        <div className="text-sm text-gray-400">
                          {section.lessons} lessons • {section.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "instructor" && (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{course.instructor}</h3>
                    <p className="text-gray-300">Lead Physics Instructor</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Dr. Sarah Johnson is a renowned physicist with over 15 years of experience in quantum mechanics research. 
                  She has published numerous papers in leading scientific journals and has taught thousands of students 
                  around the world through her engaging online courses.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}