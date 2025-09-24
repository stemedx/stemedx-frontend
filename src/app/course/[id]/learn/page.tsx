"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Mock course data with lessons
const getCourseData = (id: string) => {
  const courses = [
    {
      id: 1,
      title: "Advanced Physics Online",
      instructor: "Dr. Sarah Johnson",
      sections: [
        {
          id: 1,
          title: "Introduction to Quantum Physics",
          lessons: [
            { id: 1, title: "What is Quantum Physics?", duration: "15:30", completed: true, type: "video" },
            { id: 2, title: "Historical Development", duration: "12:45", completed: true, type: "video" },
            { id: 3, title: "Key Principles Overview", duration: "18:20", completed: false, type: "video" },
            { id: 4, title: "Practice Quiz", duration: "10:00", completed: false, type: "quiz" }
          ]
        },
        {
          id: 2,
          title: "Wave Functions and Probability",
          lessons: [
            { id: 5, title: "Understanding Wave Functions", duration: "20:15", completed: false, type: "video" },
            { id: 6, title: "Probability Distributions", duration: "16:30", completed: false, type: "video" },
            { id: 7, title: "Normalization", duration: "14:45", completed: false, type: "video" },
            { id: 8, title: "Lab Exercise 1", duration: "30:00", completed: false, type: "lab" }
          ]
        },
        {
          id: 3,
          title: "Quantum Operators",
          lessons: [
            { id: 9, title: "Linear Operators", duration: "22:10", completed: false, type: "video" },
            { id: 10, title: "Hermitian Operators", duration: "19:30", completed: false, type: "video" },
            { id: 11, title: "Eigenvalues and Eigenvectors", duration: "25:20", completed: false, type: "video" }
          ]
        }
      ]
    }
  ];
  
  return courses.find(course => course.id === parseInt(id));
};

// Mock lesson content
const getLessonContent = (lessonId: number) => {
  const lessons = {
    1: {
      title: "What is Quantum Physics?",
      videoUrl: "/api/placeholder/video",
      description: "An introduction to the fundamental concepts of quantum physics and how it differs from classical physics.",
      transcript: `Welcome to our first lesson on quantum physics. In this video, we'll explore the fundamental concepts that make quantum physics so fascinating and different from classical physics.

Quantum physics is the branch of physics that deals with the behavior of matter and energy at the atomic and subatomic scale. Unlike classical physics, which describes the macroscopic world we can see and touch, quantum physics reveals a world where particles can exist in multiple states simultaneously.

One of the key principles we'll be exploring is superposition - the idea that quantum particles can be in multiple states at once until they are observed or measured. This concept challenges our everyday understanding of reality and has led to revolutionary applications in technology.

Throughout this course, we'll dive deep into these concepts and explore how they apply to real-world scenarios and cutting-edge technology.`,
      notes: "Key takeaways:\n- Quantum physics deals with atomic/subatomic behavior\n- Superposition allows particles to exist in multiple states\n- Observation affects quantum systems\n- Applications in modern technology"
    },
    2: {
      title: "Historical Development",
      videoUrl: "/api/placeholder/video",
      description: "A journey through the key discoveries and scientists that shaped quantum physics.",
      transcript: "In this lesson, we'll explore the fascinating history of quantum physics development...",
      notes: "Important dates and discoveries in quantum physics history."
    }
  };
  
  return lessons[lessonId as keyof typeof lessons] || lessons[1];
};

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const courseId = params.id as string;
  const course = getCourseData(courseId);
  const currentLesson = getLessonContent(currentLessonId);
  
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

  // Calculate progress
  const totalLessons = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);
  const completedLessons = course.sections.reduce((acc, section) => 
    acc + section.lessons.filter(lesson => lesson.completed).length, 0
  );
  const progressPercentage = (completedLessons / totalLessons) * 100;

  // Find current lesson info
  const currentLessonInfo = course.sections
    .flatMap(section => section.lessons)
    .find(lesson => lesson.id === currentLessonId);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Sidebar - Course Navigation */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-gray-800 border-r border-gray-700 flex-shrink-0 transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/course/${courseId}`)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl">←</span>
              {!sidebarCollapsed && <span>Back to course page</span>}
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">{sidebarCollapsed ? '→' : '←'}</span>
            </button>
          </div>
          
          {!sidebarCollapsed && (
            <div className="mt-4">
              <h2 className="font-bold text-white text-lg mb-2">{course.title}</h2>
              <div className="bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>
          )}
        </div>

        {/* Course Sections */}
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          {course.sections.map((section) => (
            <div key={section.id} className="border-b border-gray-700">
              <div className="p-4">
                <h3 className={`font-semibold mb-3 ${sidebarCollapsed ? 'text-xs' : 'text-sm'} text-gray-200`}>
                  {sidebarCollapsed ? `S${section.id}` : section.title}
                </h3>
                <div className="space-y-2">
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLessonId(lesson.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        currentLessonId === lesson.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : lesson.completed
                          ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm">
                          {lesson.completed ? '✓' : 
                           lesson.type === 'video' ? '▶️' :
                           lesson.type === 'quiz' ? '❓' : 
                           lesson.type === 'lab' ? '🧪' : '📄'}
                        </span>
                        {!sidebarCollapsed && (
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{lesson.title}</p>
                            <p className="text-xs opacity-75">{lesson.duration}</p>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Progress Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white">{currentLesson?.title}</h1>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                Lesson {currentLessonId}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                Progress: {Math.round(progressPercentage)}%
              </div>
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="bg-black aspect-video">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">▶️</div>
              <h3 className="text-xl font-semibold text-white mb-2">{currentLesson?.title}</h3>
              <p className="text-gray-400 mb-6">{currentLesson?.description}</p>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
                Play Video
              </button>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex-1 bg-gray-900">
          {/* Tab Headers */}
          <div className="border-b border-gray-700">
            <div className="flex">
              {["description", "notes", "transcript"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                    activeTab === tab
                      ? "text-white border-purple-500"
                      : "text-gray-400 border-transparent hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <div className="ml-auto p-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Mark this lesson as complete
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto h-[300px]">
            {activeTab === "description" && (
              <div className="text-gray-300">
                <p className="leading-relaxed">{currentLesson?.description}</p>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="text-gray-300">
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-white mb-2">Lesson Notes</h4>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {currentLesson?.notes}
                  </pre>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">My Notes</h4>
                  <textarea
                    placeholder="Add your personal notes here..."
                    className="w-full bg-gray-700 text-white p-3 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {activeTab === "transcript" && (
              <div className="text-gray-300">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-4">Video Transcript</h4>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {currentLesson?.transcript}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}