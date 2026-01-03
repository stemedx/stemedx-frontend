import { redirect } from "next/navigation";
import { createClient } from "@/lib/services/supabase/server";
import { Profile } from "@/components/forms/profile-form";

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  dob?: string;
  nic?: string;
  email_verified?: boolean;
}

export default async function ProfilePage() {
  const supabase = await createClient();
  
  // Check authentication
  const { data } = await supabase.auth.getClaims();
  console.log("Auth User:", data);
  if (!data?.claims) {
    redirect("/login");
  }

  // Fetch user data
  const { data: { user: authUser } } = await supabase.auth.getUser();
  
  if (!authUser) {
    redirect("/login");
  }

  const userData: UserProfile = {
    id: authUser.id,
    email: authUser.email || "",
    first_name: authUser.user_metadata?.first_name || "",
    last_name: authUser.user_metadata?.last_name || "",
    phone: authUser.user_metadata?.phone || "",
    address: authUser.user_metadata?.address || "",
    dob: authUser.user_metadata?.dob || "",
    nic: authUser.user_metadata?.nic || "",
    email_verified: authUser.user_metadata?.email_verified || false,
  };

  return <Profile initialUser={userData} />;
}