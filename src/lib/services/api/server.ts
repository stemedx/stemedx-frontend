import { createClient } from '@/lib/services/auth/server';

const BASE_URL = 'http://localhost:3001';

// Server-side API function for use in Server Components
export async function serverApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  // Get Supabase session token from server
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(session?.access_token && {
        'Authorization': `Bearer ${session.access_token}`,
      }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
