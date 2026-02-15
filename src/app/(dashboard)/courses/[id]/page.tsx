import CourseDetails from "@/components/course-details";
import { coursesServerApi } from "@/lib/services/api/courses-server";
import { redirect } from "next/navigation";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = await params;

  try {
    // Fetch course details and modules in parallel
    const [course, modules] = await Promise.all([
      coursesServerApi.getById(courseId),
      coursesServerApi.getModules(courseId),
    ]);

    if (!course) {
      redirect("/courses");
    }

    return <CourseDetails course={course} modules={modules} />;
  } catch (error) {
    console.error("Failed to fetch course data:", error);
    redirect("/courses");
  }
}
