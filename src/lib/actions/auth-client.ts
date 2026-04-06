"use client";

import { createClient } from "@/lib/services/auth/client";

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
