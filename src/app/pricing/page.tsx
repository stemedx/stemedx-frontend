"use client";

export default function Courses() {

  const courses = [
    {
      id: 1,
      title: "Advanced Physics Online",
      description:
        "Master quantum mechanics through interactive simulations and virtual labs",
      duration: "12 weeks",
      level: "Advanced",
      image: "🔬",
    },
    {
      id: 2,
      title: "Data Science Bootcamp",
      description:
        "Complete online program with Python, ML, and real-world projects",
      duration: "16 weeks",
      level: "Intermediate",
      image: "📊",
    },
    {
      id: 3,
      title: "Virtual Robotics Lab",
      description:
        "Program and simulate robots online with industry-standard tools",
      duration: "20 weeks",
      level: "Advanced",
      image: "🤖",
    },
    {
      id: 4,
      title: "Environmental Science Online",
      description: "Interactive modules on climate science and sustainability",
      duration: "10 weeks",
      level: "Beginner",
      image: "🌱",
    },
    {
      id: 5,
      title: "Biomedical Engineering Digital",
      description: "Virtual labs for medical device design and biotechnology",
      duration: "18 weeks",
      level: "Advanced",
      image: "🧬",
    },
    {
      id: 6,
      title: "Computer Vision Masterclass",
      description: "Online deep learning course with hands-on AI projects",
      duration: "14 weeks",
      level: "Intermediate",
      image: "👁️",
    },
  ];

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="relative bg-primary-gradient py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Online STEM Courses
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Learn from anywhere with our interactive online courses designed by
            industry experts
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center">
                    {course.image}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      Duration: {course.duration}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.level === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : course.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.level}
                    </span>
                  </div>

                  <button
                    onClick={() => window.location.href = '/login'}
                    className="w-full bg-primary-gradient text-white py-3 rounded-xl font-semibold hover-primary-gradient transition-colors duration-200"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-gradient py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Learn Online?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of students learning STEM online with flexible
            scheduling
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-white text-primary-start px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Get Started Today
          </button>
        </div>
      </section>

    </div>
  );
}
