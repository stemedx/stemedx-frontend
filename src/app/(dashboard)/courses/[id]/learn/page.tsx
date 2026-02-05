import LearnPage from "@/components/lesson-player";
import { redirect } from "next/navigation";
import { coursesServerApi } from "@/lib/services/api/courses-server";
import { CourseModule, Course } from "@/lib/types/courses";

// Transform API data to match LearnPage expected structure
const transformCourseData = (
  modules: CourseModule[],
  courseDetails: Course,
  courseId: string
) => {
  // Create a lesson ID counter to ensure unique numeric IDs
  let lessonIdCounter = 1;

  return {
    id: courseId,
    title: courseDetails.name,
    instructor: courseDetails.instructor
      ? `${courseDetails.instructor.first_name} ${courseDetails.instructor.last_name}`
      : "Instructor Name",
    sections: modules
      .sort((a, b) => a.order - b.order)
      .map((module) => ({
        id: module.id,
        title: module.title,
        lessons: module.CourseModuleVideos
          .sort((a, b) => a.order - b.order)
          .map((video) => ({
            id: lessonIdCounter++,
            title: video.title,
            duration: `${module.duration}:00`, // Using module duration, format as mm:ss
            completed: false, // TODO: Fetch user progress from API
            type: "video" as const,
            videoUrl: video.video_url,
          })),
      })),
  };
};

export default async function Learn({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { id: courseId } = await params;
  const { lesson } = await searchParams;

  // Parse initial lesson ID from query params (default to 1)
  const initialLessonId = lesson ? parseInt(lesson, 10) : 1;

  try {
    // Fetch course details and modules in parallel
    const [courseDetails, modules] = await Promise.all([
      coursesServerApi.getById(courseId),
      coursesServerApi.getModules(courseId),
    ]);

    if (!modules || modules.length === 0) {
      redirect("/courses");
    }

    const course = transformCourseData(modules, courseDetails, courseId);
    return (
      <LearnPage
        course={course}
        courseId={courseId}
        initialLessonId={isNaN(initialLessonId) ? 1 : initialLessonId}
      />
    );
  } catch (error) {
    console.error("Failed to fetch course data:", error);
    redirect("/courses");
  }
}
