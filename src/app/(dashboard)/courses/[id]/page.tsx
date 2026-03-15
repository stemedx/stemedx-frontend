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
    const courseDetails = await coursesServerApi.getDetails(courseId);

    if (!courseDetails) {
      redirect("/courses");
    }

    return <CourseDetails course={courseDetails} />;
  } catch (error) {
    console.error("Failed to fetch course data:", error);
    redirect("/courses");
  }
}
