"use client";

export default function Tutorials() {

  const tutorials = [
    {
      id: 1,
      title: "Python for Beginners Online",
      description: "Interactive Python tutorial with live code examples",
      duration: "30 min",
      difficulty: "Beginner",
      category: "Programming",
      image: "🐍",
    },
    {
      id: 2,
      title: "ML Fundamentals Online",
      description: "Interactive machine learning concepts with visual demos",
      duration: "45 min",
      difficulty: "Intermediate",
      category: "AI/ML",
      image: "🧠",
    },
    {
      id: 3,
      title: "Virtual Electronics Lab",
      description: "Learn circuits through online simulations",
      duration: "25 min",
      difficulty: "Beginner",
      category: "Electronics",
      image: "⚡",
    },
    {
      id: 4,
      title: "Data Viz Workshop Online",
      description: "Create interactive visualizations in your browser",
      duration: "60 min",
      difficulty: "Advanced",
      category: "Data Science",
      image: "📊",
    },
    {
      id: 5,
      title: "Online 3D Design Tutorial",
      description: "Learn CAD design with browser-based tools",
      duration: "40 min",
      difficulty: "Beginner",
      category: "Engineering",
      image: "🎨",
    },
    {
      id: 6,
      title: "Neural Networks Interactive",
      description: "Visualize and experiment with neural architectures online",
      duration: "55 min",
      difficulty: "Advanced",
      category: "AI/ML",
      image: "🔗",
    },
    {
      id: 7,
      title: "Virtual Lab Safety Training",
      description: "Essential safety protocols for online lab simulations",
      duration: "20 min",
      difficulty: "Beginner",
      category: "Chemistry",
      image: "⚗️",
    },
    {
      id: 8,
      title: "Interactive Statistics Course",
      description: "Learn statistics with dynamic visualizations and exercises",
      duration: "35 min",
      difficulty: "Beginner",
      category: "Mathematics",
      image: "📈",
    },
  ];

  const categories = [
    "All",
    "Programming",
    "AI/ML",
    "Electronics",
    "Data Science",
    "Engineering",
    "Chemistry",
    "Mathematics",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTutorials =
    selectedCategory === "All"
      ? tutorials
      : tutorials.filter((tutorial) => tutorial.category === selectedCategory);

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="relative bg-primary-gradient py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Online Tutorials
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Bite-sized online lessons to master STEM concepts at your own pace
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary-gradient text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-secondary-gradient/10 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tutorials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="p-6">
                  <div className="text-3xl mb-4 text-center">
                    {tutorial.image}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {tutorial.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Duration:</span>
                      <span className="text-xs font-medium text-gray-700">
                        {tutorial.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Difficulty:</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          tutorial.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : tutorial.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tutorial.difficulty}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => window.location.href = '/login'}
                    className="w-full bg-primary-gradient text-white py-2 rounded-xl font-semibold text-sm hover-primary-gradient transition-colors duration-200"
                  >
                    Start Tutorial
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
            Ready for More Online Learning?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Access our complete online library of 500+ interactive tutorials
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-white text-primary-start px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Unlock All Tutorials
          </button>
        </div>
      </section>

    </div>
  );
}
