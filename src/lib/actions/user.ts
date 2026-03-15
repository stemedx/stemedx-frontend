"use server";
import { createClient as createServerClient } from "@/lib/services/auth/server";

/**
 * Get the user from the server - used in api routes, server componets & server actions
 *
 * @returns User | null
 */
export const getUserFromSession = async () => {
  const supabase = await createServerClient();
  return await supabase?.auth?.getUser();
};

/**
 * Method to get the user from the session, then return
 * the user's details from the database.
 *
 * We use this when we need to validate the user and their
 * permissions on the server, and cannot trust the client
 * to send the correct user details.
 *
 * @returns UserRecord | null
 */
export const getUser = async (userUid?: string) => {
  const { data } = await getUserFromSession();
  if (!data?.user?.id) return null;
  return data;
};
