import { Instructor } from './instructors';
import { Subject } from './api';

// Course Types
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

// Course Request Types
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

// Course Module Types
export interface CourseModuleVideo {
  id: string;
  module_id: string;
  title: string;
  order: number;
  video_file_id: string;
  video_url: string;
  video_url_expiry: string;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: string;
  course_unit_id: string;
  title: string;
  order: number;
  collection_id: string;
  stripe_product_id: string;
  price: string;
  duration: number;
  enrolled_count: number;
  created_at: string;
  updated_at: string;
  CourseModuleVideos: CourseModuleVideo[];
}
