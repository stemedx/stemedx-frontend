// Tutorial Types
export interface Tutorial {
  id: string;
  name: string;
  summary: string;
  description: string;
  instructor_id: string;
  thumbnail_url: string;
  price: string;
  created_at?: string;
  updated_at?: string;
}
