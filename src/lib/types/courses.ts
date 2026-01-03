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
