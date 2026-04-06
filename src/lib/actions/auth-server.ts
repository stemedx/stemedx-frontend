"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/services/auth/server";

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut({ scope: 'global' });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function sendPasswordResetEmail(
  _prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email') as string;
  
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/confirm?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signupWithEmail(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const first_name = (formData.get('first_name') as string)?.trim();
  const last_name = (formData.get('last_name') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim();
  const nic = (formData.get('nic') as string)?.trim() || "";
  const dob = (formData.get('dob') as string)?.trim() || "";
  const addressLine1 = (formData.get('addressLine1') as string)?.trim() || "";
  const addressLine2 = (formData.get('addressLine2') as string)?.trim() || "";
  const city = (formData.get('city') as string)?.trim() || "";
  const district = (formData.get('district') as string)?.trim() || "";

  if (!email || !password || !first_name || !last_name || !phone) {
    return { error: "All required fields must be filled" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const phoneRegex = /^\+\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return { error: "Invalid phone number format" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        nic,
        phone,
        dob,
        addressLine1,
        addressLine2,
        city,
        district,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {};
}

export async function resetPassword(
  _prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    return { error: error.message };
  }

  await supabase.auth.signOut({ scope: 'global' });
  revalidatePath("/", "layout");
  redirect("/login");
}