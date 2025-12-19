import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

export const useUser = () => {
  const supabase = createClient();

  const { data, isLoading, isError, error } = useQuery<
    User | null,
    Error
  >({
    queryKey: ["user-details"],
    queryFn: async () => {
      try {
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (authError) throw authError;
        if (!authData?.user?.id) return null;

        return authData.user;
      } catch (err) {
        // silently fail as we have routes that don't require a user
        return null;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: data,
    isLoading,
    isError,
    error,
  };
};
