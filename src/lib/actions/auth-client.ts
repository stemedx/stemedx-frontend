"use client";

import { createClient } from "@/lib/services/supabase/client";
import { redirect } from "next/navigation";

export async function loginWithEmail(
  email: string,
  password: string
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
}

export async function signupWithEmail(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone: string,
  nic: string,
  dob: string,
  addressLine1?: string,
  addressLine2?: string,
  city?: string,
  district?: string,
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: first_name,
        last_name: last_name,
        nic: nic,
        phone: phone,
        dob: dob,
        addressLine1: addressLine1 || "",
        addressLine2: addressLine2 || "",
        city: city || "",
        district: district || "",
      },
    },
  });

  if (error) {
    throw error;
  }
}

export async function sendPasswordResetEmail(
  _prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email') as string;

  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/confirm?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
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

  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}