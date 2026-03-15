// Instructor Types
export interface Instructor {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  profile_image_url?: string;
  bio?: string;
  portfolio_url?: string;
  social_links?: {
    linkedin?: string;
    x?: string;
    whatsapp?: string;
  };
  created_at?: string;
  updated_at?: string;
}
