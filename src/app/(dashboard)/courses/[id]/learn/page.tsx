import LearnPage from "@/components/lesson-player";
import { redirect } from "next/navigation";

// Mock course data with lessons
const getCourseData = (id: string) => {
  const courses = [
    {
      id: id, // Use the actual UUID from the URL
      title: "Advanced Physics Online",
      instructor: "Dr. Sarah Johnson",
      sections: [
        {
          id: "a042429f-278f-4339-9779-426801551c73",
          title: "Introduction to Quantum Physics",
          lessons: [
            {
              id: 1,
              title: "What is Quantum Physics?",
              duration: "15:30",
              completed: true,
              type: "video",
            },
            {
              id: 2,
              title: "Historical Development",
              duration: "12:45",
              completed: true,
              type: "video",
            },
            {
              id: 3,
              title: "Key Principles Overview",
              duration: "18:20",
              completed: false,
              type: "video",
            },
            {
              id: 4,
              title: "Practice Quiz",
              duration: "10:00",
              completed: false,
              type: "quiz",
            },
          ],
        },
        {
          id: "b9759c94-918a-447b-b47d-2080968d95a0",
          title: "Wave Functions and Probability",
          lessons: [
            {
              id: 5,
              title: "Understanding Wave Functions",
              duration: "20:15",
              completed: false,
              type: "video",
            },
            {
              id: 6,
              title: "Probability Distributions",
              duration: "16:30",
              completed: false,
              type: "video",
            },
            {
              id: 7,
              title: "Normalization",
              duration: "14:45",
              completed: false,
              type: "video",
            },
            {
              id: 8,
              title: "Lab Exercise 1",
              duration: "30:00",
              completed: false,
              type: "lab",
            },
          ],
        }
      ],
    },
  ];

  // Return the first course with the provided ID (since we only have mock data for one course)
  return courses[0];
};

export default async function Learn({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = await params;
  const course = getCourseData(courseId);

  if (!course) {
    redirect("/courses");
  }

  return <LearnPage course={course} courseId={courseId} />;
}
