import { redirect } from "next/navigation";
import { createClient } from "@/lib/services/auth/server";
import { Profile } from "@/components/forms/profile-form";

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  district?: string;
  dob?: string;
  nic?: string;
}

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    redirect("/login");
  }

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
    addressLine1: authUser.user_metadata?.addressLine1 || "",
    addressLine2: authUser.user_metadata?.addressLine2 || "",
    city: authUser.user_metadata?.city || "",
    district: authUser.user_metadata?.district || "",
    dob: authUser.user_metadata?.dob || "",
    nic: authUser.user_metadata?.nic || "",
  };

  return <Profile initialUser={userData} />;
}
