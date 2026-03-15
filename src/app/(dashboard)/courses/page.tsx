import { createClient } from "@/lib/services/auth/server";
import Courses from "@/components/courses";

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = !!data?.claims;

  return <Courses isAuthenticated={isAuthenticated} />;
}
  