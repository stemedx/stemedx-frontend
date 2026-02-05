import { API_CONFIG } from '@/lib/constants/api';
import { Course, CreateCourseRequest, UpdateCourseRequest, CourseModule } from '@/lib/types/courses';
import { Instructor } from '@/lib/types/instructors';
import { Subject } from '@/lib/types/api';
import { apiRequest } from './client';

// Course API functions
export const coursesApi = {
  // Get all courses
  getAll: (): Promise<Course[]> => {
    return apiRequest<Course[]>(API_CONFIG.ENDPOINTS.COURSES);
  },

  // Get single course by ID
  getById: (id: string): Promise<Course> => {
    return apiRequest<Course>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`);
  },

  // Create new course
  create: (courseData: CreateCourseRequest): Promise<Course> => {
    return apiRequest<Course>(API_CONFIG.ENDPOINTS.COURSES, {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  },

  // Update course
  update: (id: string, courseData: UpdateCourseRequest): Promise<Course> => {
    return apiRequest<Course>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(courseData),
    });
  },

  // Delete course
  delete: (id: string): Promise<void> => {
    return apiRequest<void>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`, {
      method: 'DELETE',
    });
  },

  // Get course modules by course unit ID
  getModules: (courseUnitId: string): Promise<CourseModule[]> => {
    return apiRequest<CourseModule[]>(`${API_CONFIG.ENDPOINTS.COURSE_MODULES}/${courseUnitId}`);
  },
};

// Helper function to get course with instructor details
export const getCoursesWithInstructors = async (): Promise<(Course & { instructor: Instructor; subject: Subject })[]> => {
  try {
    const courses = await coursesApi.getAll();

    // API already returns instructor and subject data nested in each course
    // @ts-ignore
    return courses as (Course & { instructor: Instructor; subject: Subject })[];
  } catch (error) {
    console.error('Failed to fetch courses with instructors:', error);
    return [];
  }
};
