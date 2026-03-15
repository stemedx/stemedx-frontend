import LearnPage from "@/components/lesson-player";
import { redirect } from "next/navigation";
import { coursesServerApi } from "@/lib/services/api/courses-server";

export default async function Learn({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ module?: string }>;
}) {
  const { id: courseId } = await params;
  const { module: moduleId } = await searchParams;

  if (!moduleId) {
    redirect(`/courses/${courseId}`);
  }

  try {
    const moduleDetails = await coursesServerApi.getModuleDetails(moduleId);

    return (
      <LearnPage
        course={moduleDetails.course}
        progress={moduleDetails.progress}
        module={{
          id: moduleDetails.module.id,
          title: moduleDetails.module.title,
          order: moduleDetails.module.order,
          discussionUrl: moduleDetails.module.discussionUrl,
          videos: moduleDetails.module.moduleVideos,
        }}
        courseId={courseId}
        initialLessonId={moduleDetails.initialLessonId}
      />
    );
  } catch (error) {
    console.error("Failed to fetch module details:", error);
    redirect(`/courses/${courseId}`);
  }
}
