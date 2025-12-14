// API Response Types
export interface Course {
  id: string;
  name: string;
  summary: string;
  description: string;
  instructor_id: string;
  thumbnail_url: string;
  price: string;
  subject_id: string;
  duration: number;
  created_at?: string;
  updated_at?: string;
  instructor?: Instructor; // API includes instructor data
  subject?: Subject; // API includes subject data
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

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
    twitter?: string;
  };
  created_at?: string;
  updated_at?: string;
}

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

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  nic: string;
  dob: string;
  address: string;
  phone_number: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface StudentCourse {
  id: string;
  student_id: string;
  course_id: string;
  payment_status: string;
  course_status: string;
  created_at?: string;
  updated_at?: string;
}

// API Request Types
export interface CreateCourseRequest {
  name: string;
  summary: string;
  description: string;
  instructor_id: string;
  thumbnail_url: string;
  price: string;
  subject_id: string;
  duration: number;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}