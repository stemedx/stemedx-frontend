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
  product_id: string;
  duration: number;
  total_modules: number;
  tutorial_sessions: number;
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

// GET /v1/course-units/:id/details response
export interface CourseDetailsVideo {
  id: string;
  title: string;
  lessonId: number;
  videoUrl?: string;
}

export interface CourseDetailsModule {
  id: string;
  title: string;
  duration: number;
  videoCount: number;
  videos: CourseDetailsVideo[];
  isPurchased: boolean;
  productId: string;
}

export interface CourseDetailsInstructor {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string | null;
  bioHtml: string | null;
  bioHtmlSinhala: string | null;
  socialLinks: {
    email: string;
    linkedin?: string;
    x?: string;
    whatsapp?: string;
  } | null;
}

export interface CourseDetailsResponse {
  id: string;
  name: string;
  description: string;
  language: string;
  subject: {
    name: string;
    grade: string;
  };
  instructor: CourseDetailsInstructor;
  totalModules: number;
  modules: CourseDetailsModule[];
}

// GET /v1/course-modules/:moduleId/details response
export interface ModuleDetailsVideo {
  id: string;
  title: string;
  duration: string | null;
  type: string;
  videoUrl: string | null;
  completed: boolean;
  order: number;
  previousLessonId: string | null;
  nextLessonId: string | null;
}

export interface ModuleDetailsResponse {
  course: { id: string; title: string };
  progress: { completedLessons: number; totalLessons: number };
  module: {
    id: string;
    title: string;
    order: number;
    discussionUrl: string | null;
    moduleVideos: ModuleDetailsVideo[];
  };
  initialLessonId: string;
}

// POST /v1/course-module-videos/progress
export interface VideoProgressRequest {
  student_id: string;
  video_id: string;
  is_completed?: boolean;
  notes?: string;
}

// GET /v1/course-module-videos/progress/:videoId
export interface VideoProgressResponse {
  is_completed: boolean;
  notes: string | null;
}
