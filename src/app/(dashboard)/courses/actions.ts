"use server";

import { coursesApi } from "@/lib/services/api/courses";
import { revalidatePath } from "next/cache";

export async function enrollInCourse(courseId: string) {
  try {
    // Add enrollment logic here when backend is ready
    revalidatePath("/courses");
    return { success: true };
  } catch (error) {
    return { error: "Failed to enroll in course" };
  }
}

export async function getCourses() {
  try {
    const courses = await coursesApi.getAll();
    return { courses };
  } catch (error) {
    return { error: "Failed to fetch courses" };
  }
}
