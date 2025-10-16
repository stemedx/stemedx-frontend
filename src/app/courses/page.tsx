"use client";

import { useState, useEffect } from "react";

export default function Courses() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const itemsPerPage = 8; // 2 rows of 4 cards each

  const courses = [
    {
      id: 1,
      title: "Advanced Physics Online",
      description:
        "Master quantum mechanics through interactive simulations and virtual labs",
      duration: "12 weeks",
      level: "Advanced",
      image: "🔬",
      subject: "Physics",
      grade: "12",
    },
    {
      id: 2,
      title: "Data Science Bootcamp",
      description:
        "Complete online program with Python, ML, and real-world projects",
      duration: "16 weeks",
      level: "Intermediate",
      image: "📊",
      subject: "Computer Science",
      grade: "11",
    },
    {
      id: 3,
      title: "Virtual Robotics Lab",
      description:
        "Program and simulate robots online with industry-standard tools",
      duration: "20 weeks",
      level: "Advanced",
      image: "🤖",
      subject: "Engineering",
      grade: "12",
    },
    {
      id: 4,
      title: "Environmental Science Online",
      description: "Interactive modules on climate science and sustainability",
      duration: "10 weeks",
      level: "Beginner",
      image: "🌱",
      subject: "Science",
      grade: "10",
    },
    {
      id: 5,
      title: "Biomedical Engineering Digital",
      description: "Virtual labs for medical device design and biotechnology",
      duration: "18 weeks",
      level: "Advanced",
      image: "🧬",
      subject: "Biology",
      grade: "12",
    },
    {
      id: 6,
      title: "Computer Vision Masterclass",
      description: "Online deep learning course with hands-on AI projects",
      duration: "14 weeks",
      level: "Intermediate",
      image: "👁️",
      subject: "Computer Science",
      grade: "11",
    },
    {
      id: 7,
      title: "Artificial Intelligence Fundamentals",
      description: "Learn the basics of AI and machine learning algorithms",
      duration: "15 weeks",
      level: "Intermediate",
      image: "🤖",
      subject: "Computer Science",
      grade: "12",
    },
    {
      id: 8,
      title: "Quantum Computing Introduction",
      description: "Explore quantum algorithms and quantum programming",
      duration: "22 weeks",
      level: "Advanced",
      image: "⚛️",
      subject: "Physics",
      grade: "12",
    },
    {
      id: 9,
      title: "Cybersecurity Essentials",
      description: "Protect systems and networks from digital attacks",
      duration: "13 weeks",
      level: "Intermediate",
      image: "🔒",
      subject: "Computer Science",
      grade: "11",
    },
    {
      id: 10,
      title: "Web Development Full Stack",
      description: "Build complete web applications from frontend to backend",
      duration: "24 weeks",
      level: "Beginner",
      image: "💻",
      subject: "Computer Science",
      grade: "10",
    },
    {
      id: 11,
      title: "Biotechnology Research Methods",
      description: "Advanced laboratory techniques and research methodologies",
      duration: "16 weeks",
      level: "Advanced",
      image: "🧪",
      subject: "Biology",
      grade: "11",
    },
    {
      id: 12,
      title: "Digital Signal Processing",
      description: "Analyze and process digital signals for various applications",
      duration: "18 weeks",
      level: "Advanced",
      image: "📡",
      subject: "Engineering",
      grade: "12",
    },
    {
      id: 13,
      title: "Mobile App Development",
      description: "Create iOS and Android applications using modern frameworks",
      duration: "20 weeks",
      level: "Intermediate",
      image: "📱",
      subject: "Computer Science",
      grade: "10",
    },
    {
      id: 14,
      title: "Renewable Energy Systems",
      description: "Design and optimize solar, wind, and other clean energy systems",
      duration: "14 weeks",
      level: "Intermediate",
      image: "🔋",
      subject: "Engineering",
      grade: "11",
    },
    {
      id: 15,
      title: "Game Development with Unity",
      description: "Create 2D and 3D games using Unity engine and C# scripting",
      duration: "26 weeks",
      level: "Beginner",
      image: "🎮",
      subject: "Computer Science",
      grade: "9",
    },
    {
      id: 16,
      title: "Nanotechnology Applications",
      description: "Explore nanoscale engineering and its real-world applications",
      duration: "17 weeks",
      level: "Advanced",
      image: "🔬",
      subject: "Engineering",
      grade: "12",
    }
  ];

  const subjects = ["All", "Physics", "Computer Science", "Engineering", "Science", "Biology"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  // Filter courses based on selected criteria
  const filteredCourses = courses.filter(course => {
    const subjectMatch = selectedSubject === "All" || course.subject === selectedSubject;
    const levelMatch = selectedLevel === "All" || course.level === selectedLevel;
    return subjectMatch && levelMatch;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubject, selectedLevel]);

  return (
    <div>
      <div className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pb-12 sm:pb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white pb-4">
              Online STEM Courses
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Learn from anywhere with our interactive online courses designed by industry experts
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              {/* Subject Filter */}
              <div className="flex-1">
                <label className="block text-white font-medium mb-3">
                  <span className="text-xl mr-2">🎯</span>
                  Filter by Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-md"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject} className="bg-gray-800">
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="flex-1">
                <label className="block text-white font-medium mb-3">
                  <span className="text-xl mr-2">📊</span>
                  Filter by Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-md"
                >
                  {levels.map((level) => (
                    <option key={level} value={level} className="bg-gray-800">
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count & Clear Filters */}
              <div className="flex-1">
                <div className="text-center">
                  <div className="text-white font-medium mb-2">
                    <span className="text-xl mr-2">📚</span>
                    {filteredCourses.length} courses found
                  </div>
                  {(selectedSubject !== "All" || selectedLevel !== "All") && (
                    <button
                      onClick={() => {
                        setSelectedSubject("All");
                        setSelectedLevel("All");
                      }}
                      className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 hover:text-orange-100 font-medium px-4 py-2 rounded-lg transition-all duration-300 border border-orange-400/30"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Calculate pagination */}
          {(() => {
            const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentCourses = filteredCourses.slice(startIndex, endIndex);

            return (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {currentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 h-full flex flex-col"
                    >
                      <div className="text-4xl mb-4 text-center">
                        {course.image}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white pb-3">
                        {course.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 mb-4 flex-1">{course.description}</p>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-300">
                          Duration: {course.duration}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.level === "Beginner"
                              ? "bg-green-500/20 text-green-300"
                              : course.level === "Intermediate"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {course.level}
                        </span>
                      </div>

                      <button
                        onClick={() => window.location.href = `/course/${course.id}`}
                        className="w-full bg-primary-gradient text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 mt-auto"
                      >
                        Enroll Now
                      </button>
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
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredCourses.length)} of {filteredCourses.length} courses
                      {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
                    </p>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>

      <div className="gradient-separator"></div>

      <div className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white pb-4">
              Ready to Learn Online?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of students learning STEM online with flexible scheduling
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className="bg-primary-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
