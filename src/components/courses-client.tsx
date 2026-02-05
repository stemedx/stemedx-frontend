"use client";

import { useState, useEffect } from "react";
import { getCoursesWithInstructors } from "@/lib/services/api/courses";
import { Course } from "@/lib/types/courses";
import { Instructor } from "@/lib/types/instructors";
import { Subject } from "@/lib/types/api";

type CourseWithInstructor = Course & { instructor: Instructor; subject: Subject };

export default function Courses() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedInstructor, setSelectedInstructor] = useState("All");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [courses, setCourses] = useState<CourseWithInstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 8;

  // Load courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await getCoursesWithInstructors();
        setCourses(coursesData);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const displayCourses = courses.length > 0 ? courses.map(course => ({
    id: course.id,
    title: course.name,
    description: course.summary,
    duration: `${course.duration} hours`,
    subject: course.subject?.name || "",
    subjectCode: course.subject?.code || "",
    instructor: `${course.instructor.first_name} ${course.instructor.last_name}`,
    price: course.price,
    thumbnail_url: course.thumbnail_url,
  })) : [];

  // Get unique values for filters
  const subjects = ["All", ...Array.from(new Set(displayCourses.map(course => course.subject).filter(Boolean)))];
  const instructors = ["All", ...Array.from(new Set(displayCourses.map(course => course.instructor).filter(Boolean)))];
  const subjectCodes = ["All", ...Array.from(new Set(displayCourses.map(course => course.subjectCode).filter(Boolean)))];
  const courseNames = ["All", ...Array.from(new Set(displayCourses.map(course => course.title).filter(Boolean)))];

  // Filter courses based on selected criteria
  const filteredCourses = displayCourses.filter(course => {
    const subjectMatch = selectedSubject === "All" || course.subject === selectedSubject;
    const instructorMatch = selectedInstructor === "All" || course.instructor === selectedInstructor;
    const subjectCodeMatch = selectedSubjectCode === "All" || course.subjectCode === selectedSubjectCode;
    const courseMatch = selectedCourse === "All" || course.title === selectedCourse;
    
    return subjectMatch && instructorMatch && subjectCodeMatch && courseMatch;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubject, selectedInstructor, selectedSubjectCode, selectedCourse]);

  return (
    <div>
      <div className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pb-12 sm:pb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white pb-4">
              Online STEM Courses
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Learn from anywhere with our interactive online courses designed by industry/academic experts
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
              {/* Filters Section */}
          <div className="mb-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Subject Filter */}
              <div>
                <label className="block text-white font-medium mb-3">
                  <span className="text-xl mr-2">🎯</span>
                  Subject
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
              
              {/* Subject Code Filter */}
              <div>
                <label className="block text-white font-medium mb-3">
                  <span className="text-xl mr-2">📋</span>
                  Subject Code
                </label>
                <select
                  value={selectedSubjectCode}
                  onChange={(e) => setSelectedSubjectCode(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-md"
                >
                  {subjectCodes.map((code) => (
                    <option key={code} value={code} className="bg-gray-800">
                      {code}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Instructor Filter */}
              <div>
                <label className="block text-white font-medium mb-3">
                  <span className="text-xl mr-2">👨‍🏫</span>
                  Instructor
                </label>
                <select
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-md"
                >
                  {instructors.map((instructor) => (
                    <option key={instructor} value={instructor} className="bg-gray-800">
                      {instructor}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Course Name Filter */}
              <div>
                <label className="block text-white font-medium mb-3">
                  <span className="text-xl mr-2">📘</span>
                  Course Name
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-md"
                >
                  {courseNames.map((courseName) => (
                    <option key={courseName} value={courseName} className="bg-gray-800">
                      {courseName}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            
            {/* Results Count & Clear Filters */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-white font-medium">
                <span className="text-xl mr-2">📚</span>
                {filteredCourses.length} courses found
              </div>
              {(selectedSubject !== "All" || selectedInstructor !== "All" || selectedSubjectCode !== "All" || selectedCourse !== "All") && (
                <button
                  onClick={() => {
                    setSelectedSubject("All");
                    setSelectedInstructor("All");
                    setSelectedSubjectCode("All");
                    setSelectedCourse("All");
                  }}
                  className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 hover:text-orange-100 font-medium px-4 py-2 rounded-lg transition-all duration-300 border border-orange-400/30"
                >
                  Clear All Filters
                </button>
              )}
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
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 h-full flex flex-col relative"
                    >
                      {/* Subject tag in top right corner */}
                      {course.subject && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-full text-xs font-medium">
                            {course.subject}
                          </span>
                        </div>
                      )}
                      
                      <h3 className={`text-lg sm:text-xl font-semibold text-white pb-3 ${course.subject ? 'pr-20' : ''}`}>
                        {course.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 mb-4 flex-1">{course.description}</p>

                      <div className="space-y-3 mb-4">
                        {course.duration && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">
                              Duration: {course.duration}
                            </span>
                          </div>
                        )}
                        
                        {course.instructor && (
                          <div className="space-y-2">
                            <div className="text-sm text-gray-300">
                              <span className="text-purple-300">Instructor:</span> {course.instructor}
                            </div>
                            {course.subjectCode && (
                              <div>
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded text-xs font-medium">
                                  {course.subjectCode}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {course.price && (
                          <div className="text-lg font-semibold text-green-400">
                            LKR {parseFloat(course.price).toLocaleString()}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => window.location.href = `/courses/${course.id}`}
                        className="w-full bg-primary-gradient text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 mt-auto"
                      >
                        Start Learning
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
