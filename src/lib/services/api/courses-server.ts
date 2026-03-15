import { API_CONFIG } from '@/lib/constants/api';
import { Course, CourseModule, CourseDetailsResponse, ModuleDetailsResponse } from '@/lib/types/courses';
import { serverApiRequest } from './server';

// Server-side Course API functions for use in Server Components
export const coursesServerApi = {
  // Get all courses
  getAll: (): Promise<Course[]> => {
    return serverApiRequest<Course[]>(API_CONFIG.ENDPOINTS.COURSES);
  },

  // Get single course by ID
  getById: (id: string): Promise<Course> => {
    return serverApiRequest<Course>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`);
  },

  // Get course details (pre-processed for course detail page)
  getDetails: (id: string): Promise<CourseDetailsResponse> => {
    return serverApiRequest<CourseDetailsResponse>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`);
  },

  // Get course modules by course unit ID
  getModules: (courseUnitId: string): Promise<CourseModule[]> => {
    return serverApiRequest<CourseModule[]>(`${API_CONFIG.ENDPOINTS.COURSE_MODULES}/${courseUnitId}`);
  },

  // Get module details (for learn page)
  getModuleDetails: (moduleId: string): Promise<ModuleDetailsResponse> => {
    return serverApiRequest<ModuleDetailsResponse>(
      `${API_CONFIG.ENDPOINTS.COURSE_MODULE_DETAILS}/${moduleId}/details`
    );
  },
};
