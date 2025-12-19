import {
  getUserFromSession,
} from "@/actions/user/get-user";
import { cache } from "react";

export const useUserServer = cache(async () => {
  const userSession = await getUserFromSession();
  if (!userSession?.data?.user?.id) return null;

  return userSession;
});
